import React from "react";
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import FormHelperText from "@material-ui/core/FormHelperText";

import { DatePicker } from "@material-ui/pickers";

import { Strings } from "./config/Config"
import { ConstAlexaMarketZones, constBusinesses } from "./config/Const"

const styles = theme => ({
    main: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(5),
    },
    halfRow: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(2),
        width: "50%"
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(2)
    },
    rowTitle: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(5)
    },
    title: {
        marginTop: theme.spacing(5)
    },
    itemTextField: {

    },
    leftTextField: {
        marginRight: theme.spacing(2)
    },
    rightTextField: {
        marginLeft: theme.spacing(2)
    }
});


const entries = Object.entries;
const Array_ConstAlexaMarketZones = entries(ConstAlexaMarketZones);
const Array_ConstBusinesses = entries(constBusinesses);

class MarkInfoView extends React.Component {

    constructor(props) {
        super(props);

        this.today = new Date();
        this.tomorrow = new Date();
        this.tomorrow.setDate(this.today.getDate() + 1);

        let dd = this.tomorrow.getDate();
        let mm = this.tomorrow.getMonth() + 1;
        let yyyy = this.tomorrow.getFullYear();

        if (dd < 10) dd = "0" + dd;
        if (mm < 10) mm = "0" + mm;

        let tempDate = new Date();
        this.maxDate = tempDate.setFullYear(tempDate.getFullYear() + 5);

        const today = yyyy + "-" + mm + "-" + dd;

        this.state = {

            testMPDate: today,
            sampleDate: today,
            mpDate: today,

            marketZone: [],
            marketInfoHelper: Strings.PROJECT_NEW_MARKET_INFOHELPER,
            business: Array_ConstBusinesses[0][0],
        }
    }

    componentDidMount() {
        this.props.Reference && this.props.Reference(this);
    }

    componentWillUnmount() {
        this.props.Reference && this.props.Reference(null);
    }

    Snackbar = (variant, str) => {
        this.props.enqueueSnackbar(str, { variant, autoHideDuration: 3000 });
    }

    firstMPCount = () => {
        let productHint = Strings.PROJECT_NEW_FIRST_MPCOUNT;
        if (/^[0-9]+$/.test(this.state.firstMPCount)) {
            const chineseCount = this.intToChinese(this.state.firstMPCount);
            if (chineseCount) {
                productHint += " : " + chineseCount;
                const thousand = this.state.firstMPCount / 1000;
                if (thousand > 0) {
                    productHint += ` (${thousand}k) `;
                }
            }
        }
        return productHint;
    }

    intToChinese = str => {
        str = str + "";
        var len = str.length - 1;
        var idxs = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万", "十", "百", "千", "亿"];
        var num = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
        return str.replace(/([1-9]|0+)/g, function ($, $1, idx, full) {
            var pos = 0;
            if ($1[0] !== "0") {
                pos = len - idx;
                if (idx === 0 && $1[0] === 1 && idxs[len - idx] === "十") {
                    return idxs[len - idx];
                }
                return num[$1[0]] + idxs[len - idx];
            } else {
                var left = len - idx;
                var right = len - idx + $1.length;
                if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
                    pos = left - left % 4;
                }
                if (pos) {
                    return idxs[pos] + num[$1[0]];
                } else if (idx + $1.length >= len) {
                    return "";
                } else {
                    return num[$1[0]];
                }
            }
        });
    };

    render() {
        const disabled = this.props.disabled;
        const firstMPCountLabel = this.firstMPCount();
        const { classes } = this.props;
        return (
            <div className={classes.main}>

                {/* 品牌商信息 */}
                <Typography variant="h6" gutterBottom >
                    {Strings.PROJECT_NEW_CLIENT_TITLE}
                </Typography>
                <div className={classes.row}>
                    <TextField
                        id="clientCompany"
                        disabled={disabled}
                        className={classes.leftTextField}
                        required
                        fullWidth
                        value={this.state.clientCompany}
                        error={this.state.clientCompanyError}
                        helperText={this.state.clientCompanyHelper}
                        label={Strings.PROJECT_NEW_CLIENT_COMPANY}
                        onChange={event => {

                        }}
                    />
                    <TextField
                        id="clientBrand"
                        className={classes.rightTextField}
                        disabled={disabled}
                        required
                        fullWidth
                        value={this.state.clientBrand}
                        error={this.state.clientBrandError}
                        helperText={this.state.clientBrandHelper}
                        label={Strings.PROJECT_NEW_CLIENT_BRAND}
                        onChange={event => {

                        }}
                    />
                </div>
                <div className={classes.row}>
                    <TextField
                        id="clientContact"
                        className={classes.leftTextField}
                        disabled={disabled}
                        required
                        fullWidth
                        value={this.state.clientContact}
                        error={this.state.clientContactError}
                        helperText={this.state.clientContactHelper}
                        label={Strings.PROJECT_NEW_CLIENT_CONTACT}
                        onChange={event => {

                        }}
                    />
                    <TextField
                        id="clientPhone"
                        className={classes.rightTextField}
                        disabled={disabled}
                        required
                        fullWidth
                        value={this.state.clientPhone}
                        error={this.state.clientPhoneError}
                        helperText={this.state.clientPhoneHelper}
                        label={Strings.PROJECT_NEW_CLIENT_PHONE}
                        onChange={event => {

                        }}
                    />
                </div>
                <div className={classes.halfRow}>
                    <TextField
                        id="clientEmail"
                        className={classes.leftTextField}
                        disabled={disabled}
                        required
                        fullWidth
                        value={this.state.clientEmail}
                        error={this.state.clientEmailError}
                        helperText={this.state.clientEmailHelper}
                        label={Strings.PROJECT_NEW_CLIENT_EMAIL}
                        onChange={event => {

                        }}
                    />
                </div>
                <div className={classes.row}>
                    <FormControl
                        fullWidth
                        disabled={disabled}
                        error={this.state.marketZoneError}
                    >
                        <InputLabel htmlFor="marketZone">{Strings.PROJECT_NEW_MARKET_ZONE}</InputLabel>
                        <Select
                            multiple
                            value={this.state.marketZone}
                            onChange={event => {
                                const value = event.target.value;
                                if (value.length <= 3) {
                                    this.setState({ marketZone: value }, () => {
                                        const { marketZone } = this.state;
                                        if (marketZone.length === 0) {
                                            this.setState({
                                                marketZoneError: true,
                                                marketZoneHelper: Strings.PROJECT_NEW_REQUIRED,
                                            });
                                        } else {
                                            this.setState({ marketZoneError: false, marketZoneHelper: "" });
                                        }
                                    });
                                } else {
                                    this.Snackbar('error', Strings.PROJECT_NEW_MARKETZONE_TOO_MANY);
                                }
                            }}
                            renderValue={selected => {
                                return selected.map(code => (ConstAlexaMarketZones[code])).join(", ");
                            }}
                        >
                            {Array_ConstAlexaMarketZones.map(dic => (
                                <MenuItem key={dic[0]} value={dic[0]}>
                                    <Checkbox checked={this.state.marketZone.some(code => code === dic[0])} />
                                    <ListItemText primary={dic[1]} />
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{this.state.marketZoneHelper}</FormHelperText>
                    </FormControl>
                </div>


                {/* ODM信息 */}
                <Typography className={classes.row} variant="h6" gutterBottom >
                    {Strings.PROJECT_NEW_ODM_TITLE}
                </Typography>
                <div className={classes.row}>
                    <TextField
                        id="odmCompany"
                        className={classes.leftTextField}
                        disabled={disabled}
                        required
                        fullWidth
                        value={this.state.odmCompany}
                        error={this.state.odmCompanyError}
                        helperText={this.state.odmCompanyHelper}
                        label={Strings.PROJECT_NEW_ODM_COMPANY}
                        onChange={event => {

                        }}
                    />
                    <TextField
                        id="odmProject"
                        className={classes.rightTextField}
                        disabled={disabled}
                        required
                        fullWidth
                        value={this.state.odmProject}
                        error={this.state.odmProjectError}
                        helperText={this.state.odmProjectHelper}
                        label={Strings.PROJECT_NEW_ODM_PROJECT}
                        onChange={event => {

                        }}
                    />
                </div>
                <div className={classes.row}>
                    <TextField
                        id="odmContact"
                        className={classes.leftTextField}
                        disabled={disabled}
                        required
                        fullWidth
                        value={this.state.odmContact}
                        error={this.state.odmContactError}
                        helperText={this.state.odmContactHelper}
                        label={Strings.PROJECT_NEW_ODM_CONTACT}
                        onChange={event => {

                        }}
                    />
                    <TextField
                        id="odmPhone"
                        className={classes.rightTextField}
                        disabled={disabled}
                        required
                        fullWidth
                        value={this.state.odmPhone}
                        error={this.state.odmPhoneError}
                        helperText={this.state.odmPhoneHelper}
                        label={Strings.PROJECT_NEW_ODM_PHONE}
                        onChange={event => {

                        }}
                    />
                </div>


                {/* 代理商信息 */}
                <Typography variant="h6" gutterBottom className={classes.title}>
                    {Strings.PROJECT_NEW_AGENT_TITLE}
                </Typography>
                <div className={classes.halfRow}>
                    <TextField
                        id="agent"
                        className={classes.leftTextField}
                        disabled={disabled}
                        required
                        fullWidth
                        value={this.state.agent}
                        error={this.state.agentError}
                        helperText={this.state.agentHelper}
                        label={Strings.PROJECT_NEW_AGENT}
                        onChange={event => {

                        }}
                    />
                </div>
                <div className={classes.row}>
                    <TextField
                        id="agentContact"
                        className={classes.leftTextField}
                        disabled={disabled}
                        required
                        fullWidth
                        value={this.state.agentContact}
                        error={this.state.agentContactError}
                        helperText={this.state.agentContactHelper}
                        label={Strings.PROJECT_NEW_AGENT_CONTACT}
                        onChange={event => {

                        }}
                    />
                    <TextField
                        id="agentPhone"
                        className={classes.rightTextField}
                        disabled={disabled}
                        required
                        fullWidth
                        value={this.state.agentPhone}
                        error={this.state.agentPhoneError}
                        helperText={this.state.agentPhoneHelper}
                        label={Strings.PROJECT_NEW_AGENT_PHONE}
                        onChange={event => {

                        }}
                    />
                </div>


                {/* 市场信息 */}
                <Typography variant="h6" gutterBottom className={classes.title}>
                    {Strings.PROJECT_TITLE_MARKET_INFO}
                </Typography>
                <div className={classes.row}>
                    <TextField
                        id="marketInfo"
                        className={classes.leftTextField}
                        disabled={disabled}
                        multiline
                        rows="4"
                        required
                        fullWidth
                        value={this.state.marketInfo}
                        error={this.state.marketInfoError}
                        helperText={this.state.marketInfoHelper}
                        label={Strings.PROJECT_TITLE_MARKET_INFO}
                        onChange={event => {

                        }}
                    />
                </div>


                {/* 日期信息 */}
                <div className={classes.rowTitle}>
                    <DatePicker
                        className={classes.leftTextField}
                        format="dd/MM/yyyy"
                        label={Strings.PROJECT_NEW_TESTMP_DATE}
                        helperText={this.state.testMPDateHelper}
                        error={this.state.testMPDateError}
                        value={this.state.testMPDate}
                        minDate={this.today}
                        maxDate={this.maxDate}
                        disabled={disabled}
                        fullWidth
                        required
                        animateYearScrolling
                        inputProps={{
                            id: "desc.testMPDateComment",
                        }}
                        onChange={date => {
                            this.setState({
                                testMPDate: date,
                                testMPDateError: false,
                                testMPDateHelper: "",
                            });
                        }}

                    />
                    <DatePicker
                        className={classes.rightTextField}
                        format="dd/MM/yyyy"
                        label={Strings.PROJECT_NEW_SAMPLE_DATE}
                        helperText={this.state.sampleDateHelper}
                        error={this.state.sampleDateError}
                        value={this.state.sampleDate}
                        minDate={this.today}
                        maxDate={this.maxDate}
                        disabled={disabled}
                        fullWidth
                        required
                        animateYearScrolling
                        inputProps={{
                            id: "desc.sampleDateComment",
                        }}
                        onChange={date => {
                            this.setState({
                                sampleDate: date,
                                sampleDateError: false,
                                sampleDateHelper: "",
                            });
                        }}
                    />
                </div>
                <div className={classes.rowTitle}>
                    <DatePicker
                        className={classes.leftTextField}
                        format="dd/MM/yyyy"
                        label={Strings.PROJECT_NEW_MP_DATE}
                        helperText={this.state.mpDateHelper}
                        error={this.state.mpDateError}
                        value={this.state.mpDate}
                        minDate={this.today}
                        maxDate={this.maxDate}
                        disabled={disabled}
                        fullWidth
                        required
                        animateYearScrolling
                        inputProps={{
                            id: "desc.mpDateComment",
                        }}
                        onChange={date => {
                            this.setState({ mpDate: date, mpDateError: false, mpDateHelper: "" });
                        }}

                    />
                    <TextField
                        className={classes.rightTextField}
                        inputProps={{
                            id: "desc.firstMPCountComment",
                        }}
                        type="text"
                        disabled={disabled}
                        fullWidth
                        required
                        label={firstMPCountLabel}
                        value={this.state.firstMPCount}
                        error={this.state.firstMPCountError}
                        helperText={this.state.firstMPCountHelper}
                        onChange={event => {
                            let value = event.target.value;

                            if (value.length !== 0 && (!/^[0-9]+$/.test(value) || /^0.*$/.test(value))) {
                                this.setState({
                                    firstMPCountError: true,
                                    firstMPCountHelper: Strings.PROJECT_NEW_NUMBER_FORMAT_NOTE,
                                });
                                return;
                            }

                            this.setState({
                                firstMPCountError: false,
                                firstMPCountHelper: "",
                                firstMPCount: event.target.value,
                            });
                        }}
                    />
                </div>

                <br />
                <div className={classes.halfRow}>
                    <FormControl
                        fullWidth
                        disabled={disabled}
                        className={classes.leftTextField}
                        error={this.state.businessError}>
                        <InputLabel htmlFor="business">{Strings.PROJECT_NEW_BUSINESS_OFFICER}</InputLabel>
                        <Select
                            value={this.state.business}
                            onChange={event => {
                                this.setState({ business: event.target.value });
                            }} >
                            {Array_ConstBusinesses.map(dic => (
                                <MenuItem key={dic[0]} value={dic[0]}>
                                    {dic[1]}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{this.state.businessHelper}</FormHelperText>
                    </FormControl>
                </div>

            </div>
        )
    }


    getData = () => {
        const {
            clientCompany = "",
            clientBrand = "",
            clientContact = "",
            clientPhone = "",
            clientEmail = "",
            productModel = "",
            productName = "",
            marketZone = "",
            odmCompany = "",
            odmProject = "",
            odmContact = "",
            odmPhone = "",
            agent = "",
            agentContact = "",
            agentPhone = "",
            marketInfo = "",
            testMPDate = "",
            sampleDate = "",
            mpDate = "",
            firstMPCount = "",
            business = "",
        } = this.state;

        const pal = /^[^\u4e00-\u9fa5]+$/;
        let tempError = false;
        if (clientCompany.length === 0) {
            this.setState({ clientCompanyError: true, clientCompanyHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else if (this.props.voiceService === "alexa" && !pal.test(clientCompany)) {
            this.setState({ clientCompanyError: true, clientCompanyHelper: Strings.PROJECT_NEW_NAME_NO_CHINESE });
            tempError = true;
        } else {
            this.setState({ clientCompanyError: false, clientCompanyHelper: "" });
        }

        if (clientBrand.length === 0) {
            this.setState({ clientBrandError: true, clientBrandHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            this.setState({ clientBrandError: false, clientBrandHelper: "" });
        }

        if (clientContact.length === 0) {
            this.setState({ clientContactError: true, clientContactHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            this.setState({ clientContactError: false, clientContactHelper: "" });
        }

        if (clientPhone.length === 0) {
            this.setState({ clientPhoneError: true, clientPhoneHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            this.setState({ clientPhoneError: false, clientPhoneHelper: "" });
        }

        if (
            /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
                clientEmail,
            )
        ) {
            this.setState({ clientEmailError: false, clientEmailHelper: "" });
        } else {
            this.setState({ clientEmailError: true, clientEmailHelper: Strings.LOGIN_EMAIL_INVALID });
            tempError = true;
        }

        if (productModel.length === 0) {
            this.setState({ productModelError: true, productModelHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else if (this.props.voiceService === "alexa" && !pal.test(productModel)) {
            this.setState({ productModelError: true, productModelHelper: Strings.PROJECT_NEW_NAME_NO_CHINESE });
            tempError = true;
        } else {
            this.setState({ productModelError: false, productModelHelper: "" });
        }

        if (productName.length === 0) {
            this.setState({ productNameError: true, productNameHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else if (this.props.voiceService === "alexa" && !pal.test(productName)) {
            this.setState({ productNameError: true, productNameHelper: Strings.PROJECT_NEW_NAME_NO_CHINESE });
            tempError = true;
        } else {
            this.setState({ productNameError: false, productNameHelper: "" });
        }

        if (marketZone.length === 0) {
            this.setState({ marketZoneError: true, marketZoneHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            this.setState({ marketZoneError: false, marketZoneHelper: "" });
        }

        if (odmCompany.length === 0) {
            this.setState({ odmCompanyError: true, odmCompanyHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else if (this.props.voiceService === "alexa" && !pal.test(odmCompany)) {
            this.setState({ odmCompanyError: true, odmCompanyHelper: Strings.PROJECT_NEW_NAME_NO_CHINESE });
            tempError = true;
        } else {
            this.setState({ odmCompanyError: false, odmCompanyHelper: "" });
        }

        if (odmProject.length === 0) {
            this.setState({ odmProjectError: true, odmProjectHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            this.setState({ odmProjectError: false, odmProjectHelper: "" });
        }

        if (odmContact.length === 0) {
            this.setState({ odmContactError: true, odmContactHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            this.setState({ odmContactError: false, odmContactHelper: "" });
        }

        if (odmPhone.length === 0) {
            this.setState({ odmPhoneError: true, odmPhoneHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            this.setState({ odmPhoneError: false, odmPhoneHelper: "" });
        }

        if (agent.length === 0) {
            this.setState({ agentError: true, agentHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            this.setState({ agentError: false, agentHelper: "" });
        }

        if (agentContact.length === 0) {
            this.setState({ agentContactError: true, agentContactHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            this.setState({ agentContactError: false, agentContactHelper: "" });
        }

        if (agentPhone.length === 0) {
            this.setState({ agentPhoneError: true, agentPhoneHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            this.setState({ agentPhoneError: false, agentPhoneHelper: "" });
        }

        if (marketInfo.length <= 20) {
            this.setState({ marketInfoError: true, marketInfoHelper: Strings.PROJECT_MARKET_TOOLESS });
            tempError = true;
        } else {
            this.setState({ marketInfoError: false, marketInfoHelper: Strings.PROJECT_NEW_MARKET_INFOHELPER });
        }

        if (testMPDate.length === 0) {
            this.setState({ testMPDateError: true, testMPDateHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            let date = new Date(testMPDate);
            if (date < this.today) {
                this.setState({
                    testMPDateError: true,
                    testMPDateHelper: Strings.PROJECT_NEW_TIME_NEED_TO_LATER_THAN_TODAY,
                });
                tempError = true;
            } else {
                this.setState({ testMPDateError: false, testMPDateHelper: "" });
            }
        }

        if (sampleDate.length === 0) {
            this.setState({ sampleDateError: true, sampleDateHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            let date = new Date(sampleDate);
            if (date < this.today) {
                this.setState({
                    sampleDateError: true,
                    sampleDateHelper: Strings.PROJECT_NEW_TIME_NEED_TO_LATER_THAN_TODAY,
                });
                tempError = true;
            } else {
                this.setState({ sampleDateError: false, sampleDateHelper: "" });
            }
        }

        if (mpDate.length === 0) {
            this.setState({ mpDateError: true, mpDateHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            let date = new Date(mpDate);
            if (date < this.today) {
                this.setState({ mpDateError: true, mpDateHelper: Strings.PROJECT_NEW_TIME_NEED_TO_LATER_THAN_TODAY });
                tempError = true;
            } else {
                this.setState({ mpDateError: false, mpDateHelper: "" });
            }
        }

        if (firstMPCount.length === 0) {
            this.setState({ firstMPCountError: true, firstMPCountHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            this.setState({ firstMPCountError: false, firstMPCountHelper: "" });
        }

        if (business.length === 0 || Array_ConstBusinesses.findIndex(e => e[0] === business) === -1) {
            this.setState({ businessError: true, businessHelper: Strings.PROJECT_NEW_REQUIRED });
            tempError = true;
        } else {
            this.setState({ businessError: false, businessHelper: "" });
        }

        if (tempError) {
            this.Snackbar("error", Strings.PROJECT_NOTE_FIX_WRONG_INPUT)
            return false;
        }

        return {
            clientCompany,
            clientBrand,
            clientContact,
            clientPhone,
            clientEmail,
            productModel,
            productName,
            marketZone,
            odmCompany,
            odmProject,
            odmContact,
            odmPhone,
            agent,
            agentContact,
            agentPhone,
            marketInfo,
            testMPDate,
            sampleDate,
            mpDate,
            firstMPCount,
            business,
        };
    };

}

MarkInfoView.propTypes = {
    Reference: PropTypes.func,
    disabled: PropTypes.bool,
    voiceService: PropTypes.string.isRequired,
    MarketZones: PropTypes.array.isRequired,
    Businesses: PropTypes.array.isRequired,
};

// 为属性指定默认值:
MarkInfoView.defaultProps = {
    disabled: false,
    voiceService: 'alexa',
    Businesses: Array_ConstBusinesses,
    MarketZones: Array_ConstAlexaMarketZones,
};

export default withSnackbar(withStyles(styles)(MarkInfoView));