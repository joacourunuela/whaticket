import React, { useState, useEffect, useContext, } from "react";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	CircularProgress,
	Select,
	InputLabel,
	MenuItem,
	FormControl,
	TextField,
	InputAdornment,
	IconButton
  } from '@material-ui/core';

import { Visibility, VisibilityOff } from '@material-ui/icons';

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import api from "../../services/api";
import toastError from "../../errors/toastError";
import QueueSelect from "../QueueSelect";
import { AuthContext } from "../../context/Auth/AuthContext";
import { Can } from "../Can";
import { useTranslation } from "react-i18next";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	},
	multFieldLine: {
		display: "flex",
		"& > *:not(:last-child)": {
			marginRight: theme.spacing(1),
		},
	},

	btnWrapper: {
		position: "relative",
	},

	buttonProgress: {
		color: green[500],
		position: "absolute",
		top: "50%",
		left: "50%",
		marginTop: -12,
		marginLeft: -12,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
}));

const UserSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
	password: Yup.string().min(5, "Too Short!").max(50, "Too Long!"),
	email: Yup.string().email("Invalid email").required("Required"),
});

const UserModal = ({ open, onClose, userId }) => {
	const classes = useStyles();
	const { i18n } = useTranslation();

	const initialState = {
		name: "",
		email: "",
		password: "",
		profile: "user",
		lang: "",
	};

	const { user: loggedInUser } = useContext(AuthContext);
	const [user, setUser] = useState(initialState);
	const [selectedQueueIds, setSelectedQueueIds] = useState([]);
	const [showPassword, setShowPassword] = useState(false);
	const [language, setLanguage] = useState('');
	const [changingLang, setChangingLang] = useState(false);
	const [companies, setCompanies] = useState([]);
	const [selectedCompany, setSelectedCompany] = useState();

	const handleChange = (e) => {
		setChangingLang(true);
		setLanguage(e.target.value);
	};

	function handleChangeLanguage(language) {
		i18n.changeLanguage(language);
	}

	useEffect(() => {
		const fetchUser = async () => {
			if (!userId) return;
			try {
				const { data } = await api.get(`/users/${userId}`);
				setUser(prevState => {
					return { ...prevState, ...data };
				});
				const userQueueIds = data.queues?.map(queue => queue.id);
				setSelectedQueueIds(userQueueIds);
			} catch (err) {
				toastError(err);
			}
		};

		fetchUser();
	}, [userId, open]);

	useEffect(() => {
		if (loggedInUser.companyId === 1) {
			const fetchCompanies = async () => {
				try {
					const { data } = await api.get(`/company/`);
					setCompanies(data.companies);
				} catch (err) {
					toastError(err);
				}
			}
			fetchCompanies();
		}
	}, [])

	const handleClose = () => {
		onClose();
		setUser(initialState);
		setChangingLang(false);
	};

	const handleCompanyChange = (e) => {
		setSelectedCompany(e.target.value);
	}

	const handleSaveUser = async values => {
		const userData = { ...values, lang: language, queueIds: selectedQueueIds, companyId: selectedCompany};
		try {
			if (userId) {
				await api.put(`/users/${userId}`, userData);
			} else {
				await api.post("/users", userData);
			}
			toast.success(i18n.t("userModal.success"));
		} catch (err) {
			toastError(err);
		}
		handleClose();
	};

	return (
		<div className={classes.root}>
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="xs"
				fullWidth
				scroll="paper"
			>
				<DialogTitle id="form-dialog-title">
					{userId
						? `${i18n.t("userModal.title.edit")}`
						: `${i18n.t("userModal.title.add")}`}
				</DialogTitle>
				<Formik
					initialValues={user}
					enableReinitialize={true}
					validationSchema={UserSchema}
					onSubmit={(values, actions) => {
						setTimeout(() => {
							if (user.id === loggedInUser.id) {
								handleChangeLanguage(language);
							}
							handleSaveUser(values);
							actions.setSubmitting(false);
						}, 400);
					}}
				>
					{({ touched, errors, isSubmitting }) => (
						<Form>
							<DialogContent dividers>
								<div className={classes.multFieldLine}>
									<Field
										as={TextField}
										label={i18n.t("userModal.form.name")}
										autoFocus
										name="name"
										error={touched.name && Boolean(errors.name)}
										helperText={touched.name && errors.name}
										variant="outlined"
										margin="dense"
										autoComplete="off"
										fullWidth
									/>
									<Field
										as={TextField}
										name="password"
										variant="outlined"
										margin="dense"
										autoComplete="off"
										label={i18n.t("userModal.form.password")}
										error={touched.password && Boolean(errors.password)}
										helperText={touched.password && errors.password}
										type={showPassword ? 'text' : 'password'}
										InputProps={{
										endAdornment: (
											<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => setShowPassword((e) => !e)}
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
											</InputAdornment>
										)
										}}
										fullWidth
									/>
								</div>
								<div className={classes.multFieldLine}>
									<Field
										as={TextField}
										label={i18n.t("userModal.form.email")}
										name="email"
										autoComplete="off"
										error={touched.email && Boolean(errors.email)}
										helperText={touched.email && errors.email}
										variant="outlined"
										margin="dense"
										fullWidth
									/>
									<FormControl
										variant="outlined"
										className={classes.formControl}
										margin="dense"
									>
										<Can
											role={loggedInUser.profile}
											perform="user-modal:editProfile"
											yes={() => (
												<>
													<InputLabel id="profile-selection-input-label">
														{i18n.t("userModal.form.profile")}
													</InputLabel>

													<Field
														as={Select}
														label={i18n.t("userModal.form.profile")}
														name="profile"
														labelId="profile-selection-label"
														id="profile-selection"
														required
													>
														<MenuItem value="admin">Admin</MenuItem>
														<MenuItem value="user">User</MenuItem>
													</Field>
												</>
											)}
										/>
									</FormControl>
								</div>
								<div>
									<FormControl
										variant="outlined"
										margin="dense"
										fullWidth
									>
										<InputLabel id="language-selection-label">{i18n.t("userModal.form.language")}</InputLabel>
										<Select
											label={i18n.t("userModal.form.language")}
											name="lang"
											labelId="language-selection-label"
											id="language-selection"
											value={changingLang ? language : user.lang}
											onChange={handleChange}
										>
											<MenuItem value="pt">Português</MenuItem>
											<MenuItem value="en">Inglês</MenuItem>
											<MenuItem value="es">Espanhol</MenuItem>
										</Select>
									</FormControl>
								</div>
								<Can
									role={`${loggedInUser.profile}${loggedInUser.companyId}`}
									perform="user-modal:editCompany"
									yes={() => (
										<div>
											<FormControl
												variant="outlined"
												margin="dense"
												fullWidth
											>
												<InputLabel id="company-selection-label">Empresa</InputLabel>
												<Select
													label="Empresa"
													name="company"
													labelId="company-selection-label"
													id="company-selection"
													value={selectedCompany}
													onChange={(e) => {handleCompanyChange(e)}}
												>
													{ companies && companies.map(company => {
														return (
															<MenuItem key={company.id} value={company.id}>{company.name}</MenuItem>
														)
													}) }
												</Select>
											</FormControl>
										</div>
									)}
								/>
								<Can
									role={loggedInUser.profile}
									perform="user-modal:editQueues"
									yes={() => (
										<QueueSelect
											selectedQueueIds={selectedQueueIds}
											onChange={values => setSelectedQueueIds(values)}
										/>
									)}
								/>
							</DialogContent>
							<DialogActions>
								<Button
									onClick={handleClose}
									color="secondary"
									disabled={isSubmitting}
									variant="outlined"
								>
									{i18n.t("userModal.buttons.cancel")}
								</Button>
								<Button
									type="submit"
									color="primary"
									disabled={isSubmitting}
									variant="contained"
									className={classes.btnWrapper}
								>
									{userId
										? `${i18n.t("userModal.buttons.okEdit")}`
										: `${i18n.t("userModal.buttons.okAdd")}`}
									{isSubmitting && (
										<CircularProgress
											size={24}
											className={classes.buttonProgress}
										/>
									)}
								</Button>
							</DialogActions>
						</Form>
					)}
				</Formik>
			</Dialog>
		</div>
	);
};

export default UserModal;
