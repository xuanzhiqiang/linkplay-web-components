import React from "react";
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormHelperText from "@material-ui/core/FormHelperText";

import _TextField from "@material-ui/core/TextField";
import _FormControl from "@material-ui/core/FormControl";
import { DatePicker as _DatePicker } from "@material-ui/pickers";

import { Strings } from "./config/Config";
import { withReviewComment } from "./BaseView/ReviewComment";
import { constAlexaMarketZones, constBusinesses } from "./config/Const";
import Utils from "./utils/Utils";

import pick from "lodash/pick";
import isEqual from "lodash/isEqual";

const TextField = withReviewComment(_TextField)
const FormControl = withReviewComment(_FormControl)
const DatePicker = withReviewComment(_DatePicker)

const styles = theme => ({
    main: {
        display: "flex",
        flexDirection: "column"
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
const Array_ConstAlexaMarketZones = entries(constAlexaMarketZones);
const Array_ConstBusinesses = entries(constBusinesses);

const supportState = [
    'clientCompany',
    'clientBrand',
    'clientContact',
    'clientPhone',
    'clientEmail',
    'productName',
    'productModel',
    'marketZone',

    'odmCompany',
    'odmProject',
    'odmContact',
    'odmPhone',

    'agent',
    'agentContact',
    'agentPhone',

    'marketInfo',

    'testMPDate',
    'sampleDate',
    'mpDate',

    'firstMPCount',

    'business'
]

const palChinese = /^[^\u4e00-\u9fa5]+$/;
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
            business: props.Businesses[0][0],
        }
    }

    componentDidMount() {
        this.props.Reference && this.props.Reference(this);
    }

    componentWillReceiveProps(nextProps) {
        const { initData, MarketZones } = nextProps;
        if (!isEqual(this.props.initData, initData)) {
            this._initData(initData);
        }

        if (!isEqual(this.props.MarketZones, MarketZones)) {
            if (MarketZones.length === 1) {
                this.setState({ marketZone: [MarketZones[0][0]] });
            } else {
                this.setState({ marketZone: [] });
            }
        }

    }

    componentDidUpdate(preProps, prevState) {
        const preData = this._getDataByState(prevState);
        const data = this._getDataByState(this.state);
        if (!isEqual(preData, data)) {
            this.props.OnValueChange && this.props.OnValueChange(data);
        }

        const preReviewData = this.getReviewData(prevState);
        const ReviewData = this.getReviewData(this.state);
        if (!isEqual(preReviewData, ReviewData)) {
            this.props.OnReviewDataChange && this.props.OnReviewDataChange(ReviewData);
        }

        if (this._haveError(this.state) !== this._haveError(prevState)) {
            this.props.OnErrorChange && this.props.OnErrorChange(this._haveError(this.state));
        }
    }

    componentWillUnmount() {
        this.props.Reference && this.props.Reference(null);
    }

    _Snackbar = (variant, str) => {
        this.props.enqueueSnackbar(str, { variant, autoHideDuration: 3000 });
    }

    firstMPCount = () => {
        let productHint = Strings.PROJECT_NEW_FIRST_MPCOUNT;
        if (/^[0-9]+$/.test(this.state.firstMPCount)) {
            const chineseCount = this._intToChinese(this.state.firstMPCount);
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

    _intToChinese = str => {
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
        const { ReviewEnable, disabled, Businesses, MarketZones } = this.props;
        const firstMPCountLabel = this.firstMPCount();
        const { classes } = this.props;
        console.log('this.state.marketZone', this.state.marketZone)
        return (
            <div className={classes.main}>

                {/* 品牌商信息 */}
                <Typography variant="h6" gutterBottom className={classes.title}>
                    {Strings.PROJECT_NEW_CLIENT_TITLE}
                </Typography>
                <div className={classes.row}>
                    <TextField
                        id="clientCompany"
                        className={classes.leftTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.clientCompany}
                        error={this.state.clientCompanyError}
                        helperText={this.state.clientCompanyHelper}
                        label={Strings.PROJECT_NEW_CLIENT_COMPANY}
                        onChange={event => {
                            this.setState({ clientCompany: event.target.value }, () => {
                                const { clientCompany } = this.state;
                                if (clientCompany.length === 0) {
                                    this.setState({
                                        clientCompanyError: true,
                                        clientCompanyHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else if (this.props.voiceService === "alexa" && !palChinese.test(clientCompany)) {
                                    this.setState({
                                        clientCompanyError: true,
                                        clientCompanyHelper: Strings.PROJECT_NEW_NAME_NO_CHINESE,
                                    });
                                } else {
                                    this.setState({ clientCompanyError: false, clientCompanyHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.clientCompanyComment}
                        onCommentError={error => {
                            this.setState({ clientCompanyComment: error });
                        }}
                    />
                    <TextField
                        id="clientBrand"
                        className={classes.rightTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.clientBrand}
                        error={this.state.clientBrandError}
                        helperText={this.state.clientBrandHelper}
                        label={Strings.PROJECT_NEW_CLIENT_BRAND}
                        onChange={event => {
                            this.setState({ clientBrand: event.target.value }, () => {
                                const { clientBrand } = this.state;
                                if (clientBrand.length === 0) {
                                    this.setState({
                                        clientBrandError: true,
                                        clientBrandHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else {
                                    this.setState({ clientBrandError: false, clientBrandHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.clientBrandComment}
                        onCommentError={error => {
                            this.setState({ clientBrandComment: error });
                        }}
                    />
                </div>
                <div className={classes.row}>
                    <TextField
                        id="clientContact"
                        className={classes.leftTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.clientContact}
                        error={this.state.clientContactError}
                        helperText={this.state.clientContactHelper}
                        label={Strings.PROJECT_NEW_CLIENT_CONTACT}
                        onChange={event => {
                            this.setState({ clientContact: event.target.value }, () => {
                                const { clientContact } = this.state;
                                if (clientContact.length === 0) {
                                    this.setState({
                                        clientContactError: true,
                                        clientContactHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else {
                                    this.setState({ clientContactError: false, clientContactHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.clientContactComment}
                        onCommentError={error => {
                            this.setState({ clientContactComment: error });
                        }}
                    />
                    <TextField
                        id="clientPhone"
                        className={classes.rightTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.clientPhone}
                        error={this.state.clientPhoneError}
                        helperText={this.state.clientPhoneHelper}
                        label={Strings.PROJECT_NEW_CLIENT_PHONE}
                        onChange={event => {
                            this.setState({ clientPhone: event.target.value }, () => {
                                const { clientPhone } = this.state;
                                if (clientPhone.length === 0) {
                                    this.setState({
                                        clientPhoneError: true,
                                        clientPhoneHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else {
                                    this.setState({ clientPhoneError: false, clientPhoneHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.clientPhoneComment}
                        onCommentError={error => {
                            this.setState({ clientPhoneComment: error });
                        }}
                    />
                </div>
                <div className={classes.halfRow}>
                    <TextField
                        id="clientEmail"
                        className={classes.leftTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.clientEmail}
                        error={this.state.clientEmailError}
                        helperText={this.state.clientEmailHelper}
                        label={Strings.PROJECT_NEW_CLIENT_EMAIL}
                        onChange={event => {
                            this.setState({ clientEmail: event.target.value }, () => {
                                const { clientEmail } = this.state;
                                if (
                                    /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
                                        clientEmail,
                                    )
                                ) {
                                    this.setState({ clientEmailError: false, clientEmailHelper: "" });
                                } else {
                                    this.setState({
                                        clientEmailError: true,
                                        clientEmailHelper: Strings.LOGIN_EMAIL_INVALID,
                                    });
                                }
                            });
                        }}
                        commentValue={this.state.clientEmailComment}
                        onCommentError={error => {
                            this.setState({ clientEmailComment: error });
                        }}
                    />
                </div>
                <div className={classes.row}>
                    <TextField
                        id="productName"
                        className={classes.leftTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.productName}
                        error={this.state.productNameError}
                        helperText={this.state.productNameHelper}
                        label={Strings.PROJECT_NEW_PRODUCT_NAME}
                        onChange={event => {
                            this.setState({ productName: event.target.value }, () => {
                                const { productName } = this.state;
                                if (productName.length === 0) {
                                    this.setState({
                                        productNameError: true,
                                        productNameHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else if (this.props.voiceService === "alexa" && !palChinese.test(productName)) {
                                    this.setState({
                                        productNameError: true,
                                        productNameHelper: Strings.PROJECT_NEW_NAME_NO_CHINESE,
                                    });
                                } else {
                                    this.setState({ productNameError: false, productNameHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.productNameComment}
                        onCommentError={error => {
                            this.setState({ productNameComment: error });
                        }}
                    />
                    <TextField
                        id="productModel"
                        className={classes.rightTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.productModel}
                        error={this.state.productModelError}
                        helperText={this.state.productModelHelper}
                        label={Strings.PROJECT_NEW_PRODUCT_MODEL}
                        onChange={event => {
                            this.setState({ productModel: event.target.value }, () => {
                                const { productModel } = this.state;
                                if (productModel.length === 0) {
                                    this.setState({
                                        productModelError: true,
                                        productModelHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else if (this.props.voiceService === "alexa" && !palChinese.test(productModel)) {
                                    this.setState({
                                        productModelError: true,
                                        productModelHelper: Strings.PROJECT_NEW_NAME_NO_CHINESE,
                                    });
                                } else {
                                    this.setState({ productModelError: false, productModelHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.productModelComment}
                        onCommentError={error => {
                            this.setState({ productModelComment: error });
                        }}
                    />
                </div>
                <div className={classes.row}>
                    <FormControl
                        id="marketZone"
                        fullWidth
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        error={this.state.marketZoneError}
                        commentValue={this.state.marketZoneComment}
                        onCommentError={error => {
                            this.setState({ marketZoneComment: error });
                        }}
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
                                    this._Snackbar('error', Strings.PROJECT_NEW_MARKETZONE_TOO_MANY);
                                }
                            }}
                            renderValue={selected => {
                                return selected.map(code => (constAlexaMarketZones[code])).join(", ");
                            }}
                        >
                            {MarketZones.map(dic => (
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
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.odmCompany}
                        error={this.state.odmCompanyError}
                        helperText={this.state.odmCompanyHelper}
                        label={Strings.PROJECT_NEW_ODM_COMPANY}
                        onChange={event => {
                            this.setState({ odmCompany: event.target.value }, () => {
                                const { odmCompany } = this.state;
                                if (odmCompany.length === 0) {
                                    this.setState({
                                        odmCompanyError: true,
                                        odmCompanyHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else if (this.props.voiceService === "alexa" && !palChinese.test(odmCompany)) {
                                    this.setState({
                                        odmCompanyError: true,
                                        odmCompanyHelper: Strings.PROJECT_NEW_NAME_NO_CHINESE,
                                    });
                                } else {
                                    this.setState({ odmCompanyError: false, odmCompanyHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.odmCompanyComment}
                        onCommentError={error => {
                            this.setState({ odmCompanyComment: error });
                        }}
                    />
                    <TextField
                        id="odmProject"
                        className={classes.rightTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.odmProject}
                        error={this.state.odmProjectError}
                        helperText={this.state.odmProjectHelper}
                        label={Strings.PROJECT_NEW_ODM_PROJECT}
                        onChange={event => {
                            this.setState({ odmProject: event.target.value }, () => {
                                const { odmProject } = this.state;
                                if (odmProject.length === 0) {
                                    this.setState({
                                        odmProjectError: true,
                                        odmProjectHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else {
                                    this.setState({ odmProjectError: false, odmProjectHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.odmProjectComment}
                        onCommentError={error => {
                            this.setState({ odmProjectComment: error });
                        }}
                    />
                </div>
                <div className={classes.row}>
                    <TextField
                        id="odmContact"
                        className={classes.leftTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.odmContact}
                        error={this.state.odmContactError}
                        helperText={this.state.odmContactHelper}
                        label={Strings.PROJECT_NEW_ODM_CONTACT}
                        onChange={event => {
                            this.setState({ odmContact: event.target.value }, () => {
                                const { odmContact } = this.state;
                                if (odmContact.length === 0) {
                                    this.setState({
                                        odmContactError: true,
                                        odmContactHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else {
                                    this.setState({ odmContactError: false, odmContactHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.odmContactComment}
                        onCommentError={error => {
                            this.setState({ odmContactComment: error });
                        }}
                    />
                    <TextField
                        id="odmPhone"
                        className={classes.rightTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.odmPhone}
                        error={this.state.odmPhoneError}
                        helperText={this.state.odmPhoneHelper}
                        label={Strings.PROJECT_NEW_ODM_PHONE}
                        onChange={event => {
                            this.setState({ odmPhone: event.target.value }, () => {
                                const { odmPhone } = this.state;
                                if (odmPhone.length === 0) {
                                    this.setState({
                                        odmPhoneError: true,
                                        odmPhoneHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else {
                                    this.setState({ odmPhoneError: false, odmPhoneHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.odmPhoneComment}
                        onCommentError={error => {
                            this.setState({ odmPhoneComment: error });
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
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.agent}
                        error={this.state.agentError}
                        helperText={this.state.agentHelper}
                        label={Strings.PROJECT_NEW_AGENT}
                        onChange={event => {
                            this.setState({ agent: event.target.value }, () => {
                                const { agent } = this.state;
                                if (agent.length === 0) {
                                    this.setState({ agentError: true, agentHelper: Strings.PROJECT_NEW_REQUIRED });
                                } else {
                                    this.setState({ agentError: false, agentHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.agentComment}
                        onCommentError={error => {
                            this.setState({ agentComment: error });
                        }}
                    />
                </div>
                <div className={classes.row}>
                    <TextField
                        id="agentContact"
                        className={classes.leftTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.agentContact}
                        error={this.state.agentContactError}
                        helperText={this.state.agentContactHelper}
                        label={Strings.PROJECT_NEW_AGENT_CONTACT}
                        onChange={event => {
                            this.setState({ agentContact: event.target.value }, () => {
                                const { agentContact } = this.state;
                                if (agentContact.length === 0) {
                                    this.setState({
                                        agentContactError: true,
                                        agentContactHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else {
                                    this.setState({ agentContactError: false, agentContactHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.agentContactComment}
                        onCommentError={error => {
                            this.setState({ agentContactComment: error });
                        }}
                    />
                    <TextField
                        id="agentPhone"
                        className={classes.rightTextField}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        required
                        fullWidth
                        // value={this.state.agentPhone}
                        error={this.state.agentPhoneError}
                        helperText={this.state.agentPhoneHelper}
                        label={Strings.PROJECT_NEW_AGENT_PHONE}
                        onChange={event => {
                            this.setState({ agentPhone: event.target.value }, () => {
                                const { agentPhone } = this.state;
                                if (agentPhone.length === 0) {
                                    this.setState({
                                        agentPhoneError: true,
                                        agentPhoneHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else {
                                    this.setState({ agentPhoneError: false, agentPhoneHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.agentPhoneComment}
                        onCommentError={error => {
                            this.setState({ agentPhoneComment: error });
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
                        ReviewEnable={ReviewEnable}
                        multiline
                        rows="4"
                        required
                        fullWidth
                        // value={this.state.marketInfo}
                        error={this.state.marketInfoError}
                        helperText={this.state.marketInfoHelper}
                        label={Strings.PROJECT_TITLE_MARKET_INFO}
                        onChange={event => {
                            this.setState({ marketInfo: event.target.value }, () => {
                                const { marketInfo } = this.state;
                                if (marketInfo.length === 0) {
                                    this.setState({
                                        marketInfoError: true,
                                        marketInfoHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else {
                                    this.setState({
                                        marketInfoError: false,
                                        marketInfoHelper: Strings.PROJECT_NEW_MARKET_INFOHELPER,
                                    });
                                }
                            });
                        }}
                        commentValue={this.state.marketInfoComment}
                        onCommentError={error => {
                            this.setState({ marketInfoComment: error });
                        }}
                    />
                </div>


                {/* 日期信息 */}
                <div className={classes.rowTitle}>
                    <DatePicker
                        id="testMPDate"
                        className={classes.leftTextField}
                        format="dd/MM/yyyy"
                        label={Strings.PROJECT_NEW_TESTMP_DATE}
                        helperText={this.state.testMPDateHelper}
                        error={this.state.testMPDateError}
                        value={this.state.testMPDate}
                        minDate={this.today}
                        maxDate={this.maxDate}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        fullWidth
                        required
                        animateYearScrolling
                        onChange={date => {
                            this.setState({ testMPDate: date }, () => {
                                const { testMPDate } = this.state;
                                if (testMPDate.length === 0) {
                                    this.setState({
                                        testMPDateError: true,
                                        testMPDateHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else {
                                    let date = new Date(testMPDate);
                                    if (date < this.today) {
                                        this.setState({
                                            testMPDateError: true,
                                            testMPDateHelper: Strings.PROJECT_NEW_TIME_NEED_TO_LATER_THAN_TODAY,
                                        });
                                    } else {
                                        this.setState({ testMPDateError: false, testMPDateHelper: "" });
                                    }
                                }
                            });
                        }}
                        commentValue={this.state.testMPDateComment}
                        onCommentError={error => {
                            this.setState({ testMPDateComment: error });
                        }}

                    />
                    <DatePicker
                        id="sampleDate"
                        className={classes.rightTextField}
                        format="dd/MM/yyyy"
                        label={Strings.PROJECT_NEW_SAMPLE_DATE}
                        helperText={this.state.sampleDateHelper}
                        error={this.state.sampleDateError}
                        value={this.state.sampleDate}
                        minDate={this.today}
                        maxDate={this.maxDate}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        fullWidth
                        required
                        animateYearScrolling
                        onChange={date => {
                            this.setState({ sampleDate: date }, () => {
                                const { sampleDate } = this.state;
                                if (sampleDate.length === 0) {
                                    this.setState({
                                        sampleDateError: true,
                                        sampleDateHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else {
                                    let date = new Date(sampleDate);
                                    if (date < this.today) {
                                        this.setState({
                                            sampleDateError: true,
                                            sampleDateHelper: Strings.PROJECT_NEW_TIME_NEED_TO_LATER_THAN_TODAY,
                                        });
                                    } else {
                                        this.setState({ sampleDateError: false, sampleDateHelper: "" });
                                    }
                                }
                            });
                        }}
                        commentValue={this.state.sampleDateComment}
                        onCommentError={error => {
                            this.setState({ sampleDateComment: error });
                        }}
                    />
                </div>
                <div className={classes.rowTitle}>
                    <DatePicker
                        id="mpDate"
                        className={classes.leftTextField}
                        format="dd/MM/yyyy"
                        label={Strings.PROJECT_NEW_MP_DATE}
                        helperText={this.state.mpDateHelper}
                        error={this.state.mpDateError}
                        value={this.state.mpDate}
                        minDate={this.today}
                        maxDate={this.maxDate}
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        fullWidth
                        required
                        animateYearScrolling
                        onChange={date => {
                            this.setState({ mpDate: date }, () => {
                                const { mpDate } = this.state;
                                if (mpDate.length === 0) {
                                    this.setState({ mpDateError: true, mpDateHelper: Strings.PROJECT_NEW_REQUIRED });
                                } else {
                                    let date = new Date(mpDate);
                                    if (date < this.today) {
                                        this.setState({
                                            mpDateError: true,
                                            mpDateHelper: Strings.PROJECT_NEW_TIME_NEED_TO_LATER_THAN_TODAY,
                                        });
                                    } else {
                                        this.setState({ mpDateError: false, mpDateHelper: "" });
                                    }
                                }
                            });
                        }}
                        commentValue={this.state.mpDateComment}
                        onCommentError={error => {
                            this.setState({ mpDateComment: error });
                        }}

                    />
                    <TextField
                        id="firstMPCount"
                        className={classes.rightTextField}
                        type="text"
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        fullWidth
                        required
                        label={firstMPCountLabel}
                        // value={this.state.firstMPCount}
                        error={this.state.firstMPCountError}
                        helperText={this.state.firstMPCountHelper}
                        onChange={event => {
                            let value = event.target.value;
                            if (value.length !== 0 && (!/^[0-9]+$/.test(value) || /^0.*$/.test(value))) {
                                return;
                            }
                            this.setState({ firstMPCount: value }, () => {
                                const { firstMPCount } = this.state;
                                if (firstMPCount.length === 0) {
                                    this.setState({
                                        firstMPCountError: true,
                                        firstMPCountHelper: Strings.PROJECT_NEW_REQUIRED,
                                    });
                                } else {
                                    this.setState({ firstMPCountError: false, firstMPCountHelper: "" });
                                }
                            });
                        }}
                        commentValue={this.state.firstMPCountComment}
                        onCommentError={error => {
                            this.setState({ firstMPCountComment: error });
                        }}
                    />
                </div>

                <br />
                <div className={classes.halfRow}>
                    <FormControl
                        id="business"
                        fullWidth
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        className={classes.leftTextField}
                        commentValue={this.state.businessComment}
                        onCommentError={error => {
                            this.setState({ businessComment: error });
                        }}
                        error={this.state.businessError}>
                        <InputLabel htmlFor="business">{Strings.PROJECT_NEW_BUSINESS_OFFICER}</InputLabel>
                        <Select
                            value={this.state.business}
                            onChange={event => {
                                this.setState({ business: event.target.value });
                            }} >
                            {Businesses.map(dic => (
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

    _initData = (initData) => {
        let data = pick(initData, supportState)
        this.setState(data);
    }

    _getDataByState = (state) => {
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
        } = state;
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
            business
        };
    };

    _haveError = (state) => {
        return Utils.haveError(state);
    };

    getReviewData = (state) => {
        return Utils.getReviewData(state);
    };

}

MarkInfoView.propTypes = {
    Reference: PropTypes.func,
    OnValueChange: PropTypes.func,
    OnErrorChange: PropTypes.func,
    OnReviewDataChange: PropTypes.func,
    disabled: PropTypes.bool,
    ReviewEnable: PropTypes.bool,
    initData: PropTypes.object,
    Businesses: PropTypes.array,
    voiceService: PropTypes.string.isRequired,
    MarketZones: PropTypes.array.isRequired,
};

// 为属性指定默认值:
MarkInfoView.defaultProps = {
    disabled: false,
    ReviewEnable: false,
    initData: {},
    voiceService: 'alexa',
    Businesses: Array_ConstBusinesses,
    MarketZones: Array_ConstAlexaMarketZones,
};

export default withSnackbar(withStyles(styles)(MarkInfoView));