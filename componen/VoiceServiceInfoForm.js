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
import {
    constMusicTestings,
    constAlexaMarketZones,
} from "./config/Const";
import Utils from "./utils/Utils";

import pick from "lodash/pick";
import isEqual from "lodash/isEqual";

const TextField = withReviewComment(_TextField)
const DatePicker = withReviewComment(_DatePicker)
const FormControl = withReviewComment(_FormControl)

const styles = theme => ({
    main: {
        display: "flex",
        flexDirection: "column"
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(2),
        alignItems: 'center',
    },
    InnerLayer_row: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    appNameCheck: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    title: {
        marginTop: theme.spacing(5)
    },
    title2: {
        backgroundColor: "lightgray",
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(1),
    },
    content: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(1),
    },
    platformLinkButton: {
        marginLeft: theme.spacing(2)
    },
    itemTextField: {

    }
});

const supportState = [
    'technicalContact',
    'technicalEmail',
    'amazonPointContact',
    'testDateArray',
    'primaryCountry',
    'derivativeOriginalCompay',
    'derivativeOriginalProduct',
    'derivativeOriginalProductDesc',
    'musicTesting',
]

class VoiceServiceInfoForm extends React.Component {

    constructor(props) {
        super(props);
        let minDate = new Date();
        minDate.setHours(0, 0, 0, 0);
        minDate.setDate(minDate.getDate() + 60);
        this.minDate = minDate;
        let tempDates = this.initTestDateArray(props);

        let tempDate = new Date();
        this.maxDate = tempDate.setFullYear(tempDate.getFullYear() + 5);

        this.allMusicTestings = [
            { title: constMusicTestings["Audible"], value: "Audible", describe: "" },
            { title: constMusicTestings["Amazon Music"], value: "Amazon Music", describe: "" },
            { title: constMusicTestings["iHeartRadio / TuneIn"], value: "iHeartRadio / TuneIn", describe: "" },
            { title: constMusicTestings["Spotify"], value: "Spotify", describe: "" },
            { title: constMusicTestings["Pandora"], value: "Pandora", describe: "" },
            {
                title: constMusicTestings["Music Skill Kit"],
                value: "Music Skill Kit",
                describe: "DEEZER AVS, SIRIUS XM SAVAN, DHITS ...",
            },
        ];

        this.state = {
            testDateArray: tempDates,
            primaryCountry: tempDates[0].zone,
            musicTesting: ["Audible", "Amazon Music", "iHeartRadio / TuneIn"],
        }
    }

    initTestDateArray = props => {
        let dd = this.minDate.getDate();
        let mm = this.minDate.getMonth() + 1;
        // let yyyy = this.minDate.getFullYear();

        if (dd < 10) dd = "0";
        if (mm < 10) mm = "0" + mm;

        let tempDates = [];
        for (let zone of props.marketZone) {
            tempDates.push({ zone: zone, date: this.minDate, title: constAlexaMarketZones[zone] });
        }
        return tempDates;
    };

    componentDidMount() {
        this.props.Reference && this.props.Reference(this);
    }

    componentWillReceiveProps(nextProps) {
        const { initData } = nextProps;
        if (!isEqual(this.props.initData, initData)) {
            this._initData(initData);
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

    render() {
        const { classes, ReviewEnable, disabled } = this.props;
        const { testDateArray = [] } = this.state;
        return (
            <div className={classes.main}>

                <Typography variant="h6" gutterBottom className={classes.title}>
                    {Strings.PROJECT_NEW_AVS_FORM_TITLE}
                </Typography>

                <div className={classes.content}>

                    <Typography className={classes.title2} variant="subtitle1" gutterBottom>
                        Contact Information
                    </Typography>
                    <div className={classes.row}>
                        <TextField
                            id="technicalContact"
                            className={classes.itemTextField}
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            required
                            fullWidth
                            helperText={Strings.PROJECT_ALEXA_TECHNICAL_CONTACT_NOTE}
                            label={"Technical Contact Name"}
                            defaultValue={this.state.technicalContact}
                            onChange={event => {
                                this.setState({ technicalContact: event.target.value });
                            }}
                            commentValue={this.state.technicalContactComment}
                            onCommentError={error => {
                                this.setState({ technicalContactComment: error });
                            }}
                        />
                    </div>
                    <div className={classes.row}>
                        <TextField
                            id="technicalEmail"
                            className={classes.itemTextField}
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            required
                            fullWidth
                            helperText={Strings.PROJECT_ALEXA_TECHNICAL_CONTACTMAIL_NOTE}
                            label={"Technical Contact Email"}
                            defaultValue={this.state.technicalEmail}
                            onChange={event => {
                                this.setState({ technicalEmail: event.target.value });
                            }}
                            commentValue={this.state.technicalEmailComment}
                            onCommentError={error => {
                                this.setState({ technicalEmailComment: error });
                            }}
                        />
                    </div>
                    <div className={classes.row}>
                        <TextField
                            id="amazonPointContact"
                            className={classes.itemTextField}
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            required
                            fullWidth
                            label={"Amazon Point of Contact"}
                            helperText={' '}
                            defaultValue={this.state.amazonPointContact}
                            onChange={event => {
                                this.setState({ amazonPointContact: event.target.value });
                            }}
                            commentValue={this.state.amazonPointContactComment}
                            onCommentError={error => {
                                this.setState({ amazonPointContactComment: error });
                            }}
                        />
                    </div>

                    <Typography className={classes.title2} variant="subtitle1" gutterBottom>
                        Requested Test Dates
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                        {Strings.PROJECT_ALEXA_REQUESTEDDATE_NOTE}
                    </Typography>

                    {
                        testDateArray && testDateArray.map(dic => {
                            return (
                                <div key={`testDateArray[${dic.zone}]`} className={classes.row}>
                                    <DatePicker
                                        id={`testDateArray[${dic.zone}]`}
                                        fullWidth
                                        label={dic.title}
                                        value={dic.date}
                                        minDate={this.minDate}
                                        maxDate={this.maxDate}
                                        animateYearScrolling
                                        format="dd/MM/yyyy"
                                        onChange={date => {
                                            if (date < this.minDate) {
                                                this.props.enqueueSnackbar(Strings.PROJECT_NEW_TIME_NEED_TO_LATER_THAN_2M, {
                                                    variant: "error",
                                                    autoHideDuration: 3000,
                                                });
                                                return;
                                            }
                                            const index = testDateArray.indexOf(dic);
                                            dic.date = date;
                                            let tempDates = this.state.testDateArray;
                                            tempDates[index] = dic;
                                            this.setState({ testDateArray: tempDates });
                                        }}
                                        commentValue={this.state[`testDateArray[${dic.zone}]Comment`]}
                                        onCommentError={error => {
                                            const key = `testDateArray[${dic.zone}]Comment`;
                                            const sta = {};
                                            sta[key] = error;
                                            this.setState(sta);
                                        }}
                                    />
                                </div>
                            );
                        })
                    }
                    <div className={classes.row}>
                        <FormControl
                            id="primaryCountry"
                            fullWidth
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            error={this.state.primaryCountryError}
                            commentValue={this.state.primaryCountryComment}
                            onCommentError={error => {
                                this.setState({ primaryCountryComment: error });
                            }}>
                            <InputLabel htmlFor="primaryCountry">Primary Country</InputLabel>
                            <Select
                                value={this.state.primaryCountry}
                                onChange={event => {
                                    this.setState({ primaryCountry: event.target.value });
                                }}
                            >
                                {testDateArray.map(dic => (
                                    <MenuItem key={dic.zone} value={dic.zone}>
                                        {dic.title}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{" "}</FormHelperText>
                        </FormControl>
                    </div>


                    {/* 衍生产品 */}
                    <Typography className={classes.title2} variant="subtitle1" gutterBottom>
                        Derivative Products ONLY
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                        {Strings.PROJECT_ALEXA_DERIVATIVE_NOTE}
                    </Typography>

                    <div className={classes.row}>
                        <TextField
                            id="derivativeOriginalCompay"
                            className={classes.itemTextField}
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            required
                            fullWidth
                            label={"Original Company Name"}
                            defaultValue={this.state.derivativeOriginalCompay}
                            onChange={event => {
                                this.setState({ derivativeOriginalCompay: event.target.value });
                            }}
                            commentValue={this.state.derivativeOriginalCompayComment}
                            onCommentError={error => {
                                this.setState({ derivativeOriginalCompayComment: error });
                            }}
                        />
                    </div>
                    <div className={classes.row}>
                        <TextField
                            id="derivativeOriginalProduct"
                            className={classes.itemTextField}
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            required
                            fullWidth
                            label={"Original Product Name"}
                            defaultValue={this.state.derivativeOriginalProduct}
                            onChange={event => {
                                this.setState({ derivativeOriginalProduct: event.target.value });
                            }}
                            commentValue={this.state.derivativeOriginalProductComment}
                            onCommentError={error => {
                                this.setState({ derivativeOriginalProductComment: error });
                            }}
                        />
                    </div>
                    <div className={classes.row}>
                        <TextField
                            id="derivativeOriginalProductDesc"
                            className={classes.itemTextField}
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            required
                            fullWidth
                            label={"Original Product Name"}
                            helperText={' '}
                            defaultValue={this.state.derivativeOriginalProductDesc}
                            onChange={event => {
                                this.setState({ derivativeOriginalProductDesc: event.target.value });
                            }}
                            commentValue={this.state.derivativeOriginalProductDescComment}
                            onCommentError={error => {
                                this.setState({ derivativeOriginalProductDescComment: error });
                            }}
                        />
                    </div>


                    <Typography className={classes.title2} variant="subtitle1" gutterBottom>
                        Music and Entertainment Testing
                    </Typography>
                    <div className={classes.row}>
                        <FormControl
                            id="musicTesting"
                            fullWidth
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            commentValue={this.state.musicTestingComment}
                            onCommentError={error => {
                                this.setState({ musicTestingComment: error });
                            }}>
                            <Select
                                multiple
                                value={this.state.musicTesting}
                                onChange={event => {
                                    let value = event.target.value;
                                    value.indexOf("Audible") === -1 && (value = value.concat(["Audible"]));
                                    value.indexOf("Amazon Music") === -1 && (value = value.concat(["Amazon Music"]));
                                    value.indexOf("iHeartRadio / TuneIn") === -1 && (value = value.concat(["iHeartRadio / TuneIn"]));
                                    this.setState({ musicTesting: value });
                                }}
                                renderValue={selected => {
                                    return selected
                                        .map(value => this.allMusicTestings.find(dic => dic.value === value).title)
                                        .join(", ");
                                }}
                            >
                                {this.allMusicTestings.map(dic => (
                                    <MenuItem key={dic.value} value={dic.value}>
                                        <Checkbox
                                            disabled={
                                                dic.value === "Audible" ||
                                                dic.value === "Amazon Music" ||
                                                dic.value === "iHeartRadio / TuneIn"
                                            }
                                            checked={this.state.musicTesting.some(value => value === dic.value)}
                                        />
                                        <ListItemText primary={dic.title} />
                                        <Typography variant="caption" gutterBottom>
                                            {dic.describe}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{" "}</FormHelperText>
                        </FormControl>
                    </div>

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
           technicalContact='',
           technicalEmail='',
           amazonPointContact='',
           testDateArray=[],
           primaryCountry='',
           derivativeOriginalCompay='',
           derivativeOriginalProduct='',
           derivativeOriginalProductDesc='',
           musicTesting=[],
        } = state;
        return {
            technicalContact,
            technicalEmail,
            amazonPointContact,
            testDateArray,
            primaryCountry,
            derivativeOriginalCompay,
            derivativeOriginalProduct,
            derivativeOriginalProductDesc,
            musicTesting,
        };
    };

    _haveError = (state) => {
        return Utils.haveError(state);
    };

    getReviewData = (state) => {
        return Utils.getReviewData(state);
    };

}

VoiceServiceInfoForm.propTypes = {
    Reference: PropTypes.func,
    OnValueChange: PropTypes.func,
    OnErrorChange: PropTypes.func,
    OnReviewDataChange: PropTypes.func,
    disabled: PropTypes.bool,
    ReviewEnable: PropTypes.bool,
    initData: PropTypes.object,
    marketZone: PropTypes.array.isRequired,
    voiceService: PropTypes.string.isRequired,
};

// 为属性指定默认值:
VoiceServiceInfoForm.defaultProps = {
    disabled: false,
    ReviewEnable: false,
    initData: {},
    marketZone: [],
    voiceService: 'alexa',
};

export default withSnackbar(withStyles(styles)(VoiceServiceInfoForm));