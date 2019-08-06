import React from 'react';
import { SnackbarProvider } from 'notistack';
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-US";
import zhLocale from "date-fns/locale/zh-CN";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import MarkInfo from './MarkInfoView';
import { Strings } from "./config/Config"

import Paper from "@material-ui/core/Paper";
import { Button } from '@material-ui/core';
import Container from "@material-ui/core/Container";

export default class view extends React.Component {


    handleClick = () => {
        if (this.mMarkInfo) {
            const result = this.mMarkInfo.getData();
            console.log('result: ', result);
        }
    };

    render() {
        return (
            <MuiPickersUtilsProvider
                utils={DateFnsUtils}
                locale={Strings.getLanguage() === "zh-CN" ? zhLocale : enLocale}
            >
                <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                    <Container maxWidth="md">
                        <Paper>
                            <MarkInfo Reference={(ref) => { this.mMarkInfo = ref }} voiceService='alexa'/>

                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                Get Data
                            </Button>
                        </Paper>
                    </Container>
                </SnackbarProvider>
            </MuiPickersUtilsProvider>
        );
    }
}