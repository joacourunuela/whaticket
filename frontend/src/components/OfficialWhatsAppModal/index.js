import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

import {
	Dialog,
	DialogContent,
	DialogTitle,
	Button,
	DialogActions,
	TextField,
	Switch,
	FormControlLabel,
} from "@material-ui/core";

import QueueSelect from "../QueueSelect";
import { useTranslation } from "react-i18next";
import api from "../../services/api";
import { toast } from "react-toastify";
import toastError from "../../errors/toastError";

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
}));

const SessionSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Required"),
});

const OfficialWhatsAppModal = ({ open, onClose, whatsAppId }) => {
	const { i18n } = useTranslation();
	const classes = useStyles();
	const initialState = {
		name: "",
		greetingMessage: "",
		farewellMessage: "",
		isDefault: false,
		facebookToken: "",
		facebookPhoneNumberId: "",
		phoneNumber: "",
		official: true,
	};
	const [whatsApp, setWhatsApp] = useState(initialState);
	const [selectedQueueIds, setSelectedQueueIds] = useState([]);
    const [isConnectionTested, setIsConnectionTested] = useState(false);

	const handleClose = () => {
		onClose();
		setIsConnectionTested(false);
		setWhatsApp(initialState);
	};

    const handleConnectionTest = () => {
        setIsConnectionTested(true);
    }

	const handleSaveWhatsApp = async values => {
		const whatsappData = { ...values, queueIds: selectedQueueIds };

		try {
			if (whatsAppId) {
				await api.put(`/whatsapp/${whatsAppId}`, whatsappData);
			} else {
				await api.post("/whatsapp", whatsappData);
			}
			toast.success(i18n.t("whatsappModal.success"));
			handleClose();
		} catch (err) {
			toastError(err);
		}
	};

	return (
		<div className={classes.root}>
			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="sm"
				fullWidth
				scroll="paper"
			>
				<DialogTitle>
					{i18n.t('officialWhatsappModal.title')}
				</DialogTitle>
				<Formik
					initialValues={whatsApp}
					enableReinitialize={true}
					validationSchema={SessionSchema}
					onSubmit={(values, actions) => {
						handleSaveWhatsApp(values);
						setTimeout(() => {
							actions.setSubmitting(false);
						}, 400);
					}}
				>
					{({ values, touched, errors, isSubmitting }) => (
						<Form>
							<DialogContent dividers>
								<div className={classes.multFieldLine}>
									<Field
										as={TextField}
										label={i18n.t("whatsappModal.form.name")}
										autoFocus
										name="name"
										error={touched.name && Boolean(errors.name)}
										helperText={touched.name && errors.name}
										variant="outlined"
										margin="dense"
										className={classes.textField}
									/>
									<FormControlLabel
										control={
											<Field
												as={Switch}
												color="primary"
												name="isDefault"
												checked={values.isDefault}
											/>
										}
										label={i18n.t("whatsappModal.form.default")}
									/>
								</div>
                                <div className={classes.textQuickAnswerContainer}>
                                    <Field
                                        as={TextField}
                                        label="Número de Telefone"
                                        name="phoneNumber"
                                        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                        helperText={touched.phoneNumber && errors.phoneNumber}
                                        variant="outlined"
                                        margin="dense"
                                        className={classes.textField}
                                        fullWidth
                                    />
                                </div>
                                <div className={classes.textQuickAnswerContainer}>
                                    <Field
                                        as={TextField}
                                        label="Token de Autenticação do Facebook"
                                        name="facebookToken"
                                        error={touched.facebookToken && Boolean(errors.facebookToken)}
                                        helperText={touched.facebookToken && errors.facebookToken}
                                        variant="outlined"
                                        margin="dense"
                                        className={classes.textField}
                                        fullWidth
                                    />
                                </div>
                                <div className={classes.textQuickAnswerContainer}>
                                    <Field
                                        as={TextField}
                                        label="Id do Telefone do Facebook"
                                        name="facebookPhoneNumberId"
                                        error={touched.facebookPhoneNumberId && Boolean(errors.facebookPhoneNumberId)}
                                        helperText={touched.facebookPhoneNumberId && errors.facebookPhoneNumberId}
                                        variant="outlined"
                                        margin="dense"
                                        className={classes.textField}
                                        fullWidth
                                    />
                                </div>
								<div>
									<Field
										as={TextField}
										label={i18n.t("queueModal.form.greetingMessage")}
										type="greetingMessage"
										multiline
										minRows={3}
										fullWidth
										name="greetingMessage"
										error={
											touched.greetingMessage && Boolean(errors.greetingMessage)
										}
										helperText={
											touched.greetingMessage && errors.greetingMessage
										}
										variant="outlined"
										margin="dense"
									/>
								</div>
								<div>
									<Field
										as={TextField}
										label={i18n.t("whatsappModal.form.farewellMessage")}
										type="farewellMessage"
										multiline
										minRows={3}
										fullWidth
										name="farewellMessage"
										error={
											touched.farewellMessage && Boolean(errors.farewellMessage)
										}
										helperText={
											touched.farewellMessage && errors.farewellMessage
										}
										variant="outlined"
										margin="dense"
									/>
								</div>
								<QueueSelect
									selectedQueueIds={selectedQueueIds}
									onChange={selectedIds => setSelectedQueueIds(selectedIds)}
								/>
							</DialogContent>
							<DialogActions>
								<Button
									onClick={handleClose}
									color="secondary"
									disabled={isSubmitting}
									variant="outlined"
								>
									{i18n.t("officialWhatsappModal.buttons.cancel")}
								</Button>
                                <Button
                                    type="button"
									color="primary"
									disabled={isSubmitting}
									variant="contained"
									className={classes.btnWrapper}
                                    onClick={handleConnectionTest}
                                >
                                    {i18n.t("officialWhatsappModal.buttons.testConnection")}
                                </Button>
								<Button
									type="submit"
									color="primary"
									disabled={!isConnectionTested}
									variant="contained"
									className={classes.btnWrapper}
								>
									{i18n.t("officialWhatsappModal.buttons.add")}
								</Button>
							</DialogActions>
						</Form>
					)}
				</Formik>
			</Dialog>
		</div>
	);
};

export default React.memo(OfficialWhatsAppModal);
