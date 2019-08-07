import React from 'react';
import { SnackbarProvider } from 'notistack';
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-US";
import zhLocale from "date-fns/locale/zh-CN";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import MarkInfo from './MarkInfoView';
import BaseProjectInfo from './BaseProjectInfo';
import ProductBTInfo from './ProductBTInfo';
import ProductWIFIInfo from './ProductWIFIInfo';
import VoiceServiceInfoForm from './VoiceServiceInfoForm';
import VoiceServiceInfoAVS from './VoiceServiceInfoAVS';
import { Strings } from "./config/Config"

import Paper from "@material-ui/core/Paper";
import { Button } from '@material-ui/core';
import Container from "@material-ui/core/Container";

import { constAlexaMarketZones } from "./config/Const";

export default class view extends React.Component {

    constructor(props) {
        super(props);
        this.alexaMarketZones = Object.entries({
            "US": constAlexaMarketZones["US"],
            "GB": constAlexaMarketZones["GB"],
            "IE": constAlexaMarketZones["IE"],
            "CA": constAlexaMarketZones["CA"],
            "DE": constAlexaMarketZones["DE"],
            "AT": constAlexaMarketZones["AT"],
            "IN": constAlexaMarketZones["IN"],
            "JP": constAlexaMarketZones["JP"],
            "AU": constAlexaMarketZones["AU"],
            "NZ": constAlexaMarketZones["NZ"],
            "FR": constAlexaMarketZones["FR"],
            "IT": constAlexaMarketZones["IT"],
            "ES": constAlexaMarketZones["ES"],
            "MX": constAlexaMarketZones["MX"]
        });

        this.chinaMarketZones = Object.entries({ "CN": constAlexaMarketZones["CN"] });
        this.aliceMarketZones = Object.entries({ "RU": constAlexaMarketZones["RU"] });
        this.clovaMarketZones = Object.entries({ "KR": constAlexaMarketZones["KR"] });

        this.state = {
            MarketZones: this.alexaMarketZones
        }
    }

    handleClick = () => {
        // document.getElementById('business') && document.getElementById('business').focus();
    };



    BaseProjectInfoChange = (data) => {
        const { voiceService } = data;
        let haveChange = false;
        if (this.preVoiceService !== voiceService) {
            this.preVoiceService = voiceService;
            haveChange = true;
        }
        let MarketZones = [];
        switch (voiceService) {
            case "alexa":
                MarketZones = this.alexaMarketZones;
                break;
            case "xiaowei":
            case "dingdang":
            case "tianmao":
            case "dma":
                MarketZones = this.chinaMarketZones;
                break;
            case "alice":
                MarketZones = this.aliceMarketZones;
                break;
            case "clova":
                MarketZones = this.clovaMarketZones;
                break;
            case "other": {
                MarketZones = [
                    ...new Set([
                        ...this.alexaMarketZones,
                        ...this.clovaMarketZones,
                        ...this.aliceMarketZones,
                        ...this.chinaMarketZones,
                    ]),
                ];
                break;
            }
            default:
                MarketZones = this.alexaMarketZones;
                break;
        }
        if (haveChange) {
            this.setState({ MarketZones });
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
                        <Paper style={{ paddingLeft: 50, paddingRight: 50, paddingBottom: 50 }}>
                            {/* <BaseProjectInfo
                                OnValueChange={(data) => {
                                    // console.log('data: ',data)
                                    this.BaseProjectInfoChange(data);
                                }}
                                OnErrorChange={(error) => {
                                    // console.log('error: ',error)
                                }} />

                            <MarkInfo
                                OnValueChange={(data) => {
                                    // console.log('data: ',data)
                                }}
                                OnErrorChange={(error) => {
                                    // console.log('error: ',error)
                                }}
                                MarketZones={this.state.MarketZones}
                                voiceService='alexa' /> */}

                            {/* <ProductBTInfo
                                voiceService='alexa'
                                OnValueChange={(data) => {
                                    // console.log('data: ',data)
                                }}
                                OnErrorChange={(error) => {
                                    // console.log('error: ',error)
                                }} /> */}
                            {/* <ProductWIFIInfo
                                voiceService='alexa'
                                OnValueChange={(data) => {
                                    // console.log('data: ',data)
                                }}
                                OnErrorChange={(error) => {
                                    // console.log('error: ',error)
                                }} /> */}
                            {/* <VoiceServiceInfoForm
                                voiceService='alexa'
                                marketZone={['US', 'GB']}
                                OnValueChange={(data) => {
                                    // console.log('data: ',data)
                                }}
                                OnErrorChange={(error) => {
                                    // console.log('error: ',error)
                                }} /> */}
                            <VoiceServiceInfoAVS
                                voiceService='alexa'
                                marketZone={['US', 'GB']}
                                OnValueChange={(data) => {
                                    // console.log('data: ',data)
                                }}
                                OnErrorChange={(error) => {
                                    // console.log('error: ',error)
                                }} />

                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                style={{marginTop: 50}}
                            >
                                Next
                            </Button>
                        </Paper>
                    </Container>
                </SnackbarProvider>
            </MuiPickersUtilsProvider>
        );
    }
}