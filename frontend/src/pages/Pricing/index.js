import React, { useEffect, useReducer } from "react";
import openSocket from "../../services/socket-io";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TableCell } from "@material-ui/core";

import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import MainHeaderButtonsWrapper from "../../components/MainHeaderButtonsWrapper";
import Title from "../../components/Title";

import { useTranslation } from "react-i18next";
import api from "../../services/api";
import toastError from "../../errors/toastError";

const reducer = (state, action) => {
    if (action.type === "LOAD_PRICINGS") {
        const pricings = action.payload;
        const newPricings = [];
  
        pricings.forEach((pricing) => {
            const pricingIndex = state.findIndex((p) => p.id === pricing.id);
            if (pricingIndex !== -1) {
                state[pricingIndex] = pricing;
            } else {
                newPricings.push(pricing);
            }
        });
  
        return [...state, ...newPricings];
    }
  
    if (action.type === "UPDATE_PRICINGS") {
        const pricing = action.payload;
        const pricingIndex = state.findIndex((p) => p.id === pricing.id);
  
        if (pricingIndex !== -1) {
            state[pricingIndex] = pricing;
            return [...state];
        } else {
            return [pricing, ...state];
        }
    }
  
    if (action.type === "DELETE_PRICING") {
        const pricingId = action.payload;
  
        const pricingIndex = state.findIndex((p) => p.id === pricingId);
        if (pricingIndex !== -1) {
            state.splice(pricingIndex, 1);
        }
        return [...state];
    }
  
    if (action.type === "RESET") {
        return [];
    }
};

const useStyles = makeStyles((theme) => ({
  mainPaper: {
    flex: 1,
    padding: theme.spacing(1),
    overflowY: "scroll",
    ...theme.scrollbarStyles,
  },
}));

const Pricing = () => {
    const classes = useStyles();
    const { i18n } = useTranslation();

    const [pricings, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        dispatch({ type: "RESET" });
    }, []);

    useEffect(() => {
        const fetchPricings = async () => {
            try {
                const { data } = await api.get("/pricings/");
                dispatch({ type: "LOAD_PRICINGS", payload: data });
            } catch (err) {
                toastError(err);
            }
        };
        fetchPricings();
    }, []);

    useEffect(() => {
        const socket = openSocket();
    
        socket.on("pricing", (data) => {
            if (data.action === "update" || data.action === "create") {
                dispatch({ type: "UPDATE_PRICINGS", payload: data.pricing });
            }
    
            if (data.action === "delete") {
                dispatch({ type: "DELETE_PRICING", payload: + data.pricingId });
            }
        });
    
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <MainContainer>
            <MainHeader>
                <Title>Precificação</Title>
                <MainHeaderButtonsWrapper>
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Criar
                    </Button>
                </MainHeaderButtonsWrapper>
            </MainHeader>
            <Paper
                className={classes.mainPaper}
                variant="outlined"
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Empresa</TableCell>
                            <TableCell>Produto Constratado</TableCell>
                            <TableCell>Cliente Desde De</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Valor a Pagar</TableCell>
                            <TableCell>Valor Pago</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    </TableBody>
                </Table>
        </Paper>
    </MainContainer>
  );
};

export default Pricing;
