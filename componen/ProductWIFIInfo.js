import React from "react";
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import _TextField from "@material-ui/core/TextField";
import _FormControl from "@material-ui/core/FormControl";

import CheckIcon from "@material-ui/icons/Check";

import { Strings } from "./config/Config";
import FileUpload from "./BaseView/FileUpload";
import LinkplayDropZone from "./BaseView/LinkplayDropZone";
import { withReviewComment } from "./BaseView/ReviewComment";
import {
    constProductCategoriesWifi,
    constProductModelsWIFI,
    constSRTriggersWIFI,
    allDSPModels,
    allMCU,
    constAppRequestTypes
} from "./config/Const";
import Utils from "./utils/Utils";

import pick from "lodash/pick";
import isEqual from "lodash/isEqual";

const TextField = withReviewComment(_TextField)
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
    lowerRow: {
        display: "flex",
        flexDirection: "column",
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    marginTop2: {
        marginTop: theme.spacing(2)
    },
    appNameCheck: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    title: {
        marginTop: theme.spacing(5)
    },
    platformLinkButton: {
        marginLeft: theme.spacing(2)
    },
    itemTextField: {

    }
});


const entries = Object.entries;
const Array_ProductCategories = entries(constProductCategoriesWifi);
const Array_allDSPModels = entries(allDSPModels);
const Array_AppRequestTypes = entries(constAppRequestTypes);
const Array_ProductModels = entries(constProductModelsWIFI);
const Array_SRTriggers = entries(constSRTriggersWIFI);
const Array_allMCU = entries(allMCU);

const supportState = [
    'category',
    'model',
    'screen',
    'srTrigger',
    'dspModel',
    'dspSample',
    'dspI2S',
    'dspAudioOutput',
    'mcu',
    'otherMCU',
    'appRequestType',
    'appName',
    'IOTSupport',
    'airplay2',
    'deezerBuiltIn',
    'qplay',
    '_3pda',
    'sixSideImageThumbnail',
    'prdurl',
]

class ProductWIFIInfo extends React.Component {

    constructor(props) {
        super(props);
        this.allDSPSamples = [
            { title: "44.1k", value: "44.1k" },
            { title: "48k", value: "48k" },
            { title: "N/A", value: "N/A" },
        ];

        this.allDSPI2S = [
            { title: "Master", value: "Master" },
            { title: "Slave", value: "Slave" },
            { title: "N/A", value: "N/A" },
        ];

        this.allDSPAudioOutput = [
            { title: "USB", value: "USB" },
            { title: "I2S", value: "I2S" },
            { title: "N/A", value: "N/A" },
        ];

        this.state = {
            category: Array_ProductCategories[0][0],
            model: Array_ProductModels[0][0],
            screen: "noDisplayScreen",
            srTrigger: Array_SRTriggers[0][0],
            dspModel: "N/A",
            dspSample: this.allDSPSamples[0].value,
            dspI2S: this.allDSPI2S[0].value,
            dspAudioOutput: this.allDSPAudioOutput[0].value,
            mcu: "N/A",
            appRequestType: "None",
            appName: "",
            IOTSupport: false,
            airplay2: false,
            deezerBuiltIn: false,
            qplay: false,
            _3pda: false,
            appNameHelper: Strings.APP_NAME_HELPER,
        }
    }

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
        const { classes, ReviewEnable, disabled, voiceService,
            ProductCategories, AllDSPModels, ProductModels,
            SRTriggers, AppRequestTypes, AllMCU
        } = this.props;
        return (
            <div className={classes.main}>

                {/* 项目基本信息 */}
                <Typography variant="h6" gutterBottom className={classes.title}>
                    {Strings.PROJECT_TITLE_PRODUCT_DEFINE}
                </Typography>
                <div className={classes.row}>
                    <FormControl
                        id="category"
                        fullWidth
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        className={classes.itemTextField}
                        commentValue={this.state.categoryComment}
                        onCommentError={error => {
                            this.setState({ categoryComment: error });
                        }}
                        error={this.state.categoryError}>
                        <InputLabel htmlFor="category">{Strings.PROJECT_TITLE_PRODUCT_CATEGORY}</InputLabel>
                        <Select
                            value={this.state.category}
                            onChange={event => {
                                this.setState({ category: event.target.value });
                            }} >
                            {ProductCategories.map(dic => (
                                <MenuItem key={dic[0]} value={dic[0]}>
                                    {dic[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className={classes.row}>
                    <FormControl
                        id="model"
                        fullWidth
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        className={classes.itemTextField}
                        commentValue={this.state.modelComment}
                        onCommentError={error => {
                            this.setState({ modelComment: error });
                        }}
                        error={this.state.modelError}>
                        <InputLabel htmlFor="model">{Strings.PROJECT_DEVICE_MODEL}</InputLabel>
                        <Select
                            value={this.state.model}
                            onChange={event => {
                                this.setState({ model: event.target.value });
                            }} >
                            {ProductModels.map(dic => (
                                <MenuItem key={dic[0]} value={dic[0]}>
                                    {dic[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className={classes.row}>
                    <FormControl
                        id="screen"
                        fullWidth
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        className={classes.itemTextField}
                        commentValue={this.state.screenComment}
                        onCommentError={error => {
                            this.setState({ screenComment: error });
                        }}
                        error={this.state.screenError}>
                        <InputLabel htmlFor="screen">{Strings.PROJECT_TITLE_IS_THERE_A_DISPLAY_SCREEN}</InputLabel>
                        <Select
                            value={this.state.screen}
                            onChange={event => {
                                this.setState({ screen: event.target.value });
                            }} >
                            <MenuItem value="noDisplayScreen">{Strings.NO_DISPLAY_SCREEN}</MenuItem>
                            <MenuItem value="withADisplayScreen">{Strings.WITH_A_DISPLAY_SCREEN}</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {
                    voiceService !== 'other' &&
                    <div className={classes.row}>
                        <FormControl
                            id="srTrigger"
                            fullWidth
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            className={classes.itemTextField}
                            commentValue={this.state.srTriggerComment}
                            onCommentError={error => {
                                this.setState({ srTriggerComment: error });
                            }}
                            error={this.state.srTriggerError}>
                            <InputLabel htmlFor="srTrigger">{Strings.PROJECT_VOICE_TRIGGER_WAY}</InputLabel>
                            <Select
                                value={this.state.srTrigger}
                                onChange={event => {
                                    this.setState({ srTrigger: event.target.value });
                                }} >
                                {SRTriggers.map(dic => (
                                    <MenuItem key={dic[0]} value={dic[0]}>
                                        <ListItemText primary={dic[1].title} />
                                        <Typography variant="caption" gutterBottom>
                                            {dic[1].comment}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                }

                <div className={classes.row}>
                    <FormControl
                        id="dspModel"
                        fullWidth
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        className={classes.itemTextField}
                        commentValue={this.state.dspModelComment}
                        onCommentError={error => {
                            this.setState({ dspModelComment: error });
                        }}
                        error={this.state.dspModelError}>
                        <InputLabel htmlFor="dspModel">{Strings.PROJECT_DEVICE_DSPMODEL}</InputLabel>
                        <Select
                            value={this.state.dspModel}
                            onChange={event => {
                                this.setState({ dspModel: event.target.value });
                            }} >
                            {AllDSPModels.map(dic => (
                                <MenuItem key={dic[0]} value={dic[0]}>
                                    {dic[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {
                    this.state.dspModel !== "N/A" &&
                    <div className={classes.lowerRow}>
                        <FormControl
                            id="dspSample"
                            fullWidth
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            className={classes.itemTextField}
                            commentValue={this.state.dspSampleComment}
                            onCommentError={error => {
                                this.setState({ dspSampleComment: error });
                            }}
                            error={this.state.dspSampleError}>
                            <InputLabel htmlFor="dspSample">{Strings.PROJECT_NEW_DSPSAMPLE}</InputLabel>
                            <Select
                                value={this.state.dspSample}
                                onChange={event => {
                                    this.setState({ dspSample: event.target.value });
                                }}>
                                {this.allDSPSamples.map(dic => (
                                    <MenuItem key={dic.value} value={dic.value}>
                                        <ListItemText primary={dic.title} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            id="dspI2S"
                            fullWidth
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            className={classes.marginTop2}
                            commentValue={this.state.dspI2SComment}
                            onCommentError={error => {
                                this.setState({ dspI2SComment: error });
                            }}
                            error={this.state.dspI2SError}>
                            <InputLabel htmlFor="dspI2S">{Strings.PROJECT_NEW_DSPI2S}</InputLabel>
                            <Select
                                value={this.state.dspI2S}
                                onChange={event => {
                                    this.setState({ dspI2S: event.target.value });
                                }}>
                                {this.allDSPI2S.map(dic => (
                                    <MenuItem key={dic.value} value={dic.value}>
                                        <ListItemText primary={dic.title} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl
                            id="dspAudioOutput"
                            fullWidth
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            className={classes.marginTop2}
                            commentValue={this.state.dspAudioOutputComment}
                            onCommentError={error => {
                                this.setState({ dspAudioOutputComment: error });
                            }}
                            error={this.state.dspAudioOutputError}>
                            <InputLabel htmlFor="dspAudioOutput">{Strings.PROJECT_NEW_DSPOUTPUT}</InputLabel>
                            <Select
                                value={this.state.dspAudioOutput}
                                onChange={event => {
                                    this.setState({ dspAudioOutput: event.target.value });
                                }}
                            >
                                {this.allDSPAudioOutput.map(dic => (
                                    <MenuItem key={dic.value} value={dic.value}>
                                        <ListItemText primary={dic.title} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                }


                <div className={classes.row}>
                    <FormControl
                        id="mcu"
                        fullWidth
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        className={classes.itemTextField}
                        commentValue={this.state.mcuComment}
                        onCommentError={error => {
                            this.setState({ mcuComment: error });
                        }}
                        error={this.state.mcuError}>
                        <InputLabel htmlFor="mcu">MCU</InputLabel>
                        <Select
                            value={this.state.mcu}
                            onChange={event => {
                                this.setState({ mcu: event.target.value });
                            }} >
                            {AllMCU.map(dic => (
                                <MenuItem key={dic[0]} value={dic[0]}>
                                    {dic[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {
                    this.state.mcu === "other" &&
                    <div className={classes.lowerRow}>
                        <TextField
                            id="otherMCU"
                            required
                            fullWidth
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            value={this.state.otherMCU}
                            error={this.state.otherMCUError}
                            helperText={this.state.otherMCUHelper}
                            label={Strings.PROJECT_NEW_OTHERMCU}
                            onChange={event => {
                                const text = event.target.value;
                                this.setState({ otherMCU: text, otherMCUError: false, otherMCUHelper: "" });
                            }}
                            commentValue={this.state.otherMCUComment}
                            onCommentError={error => {
                                this.setState({ otherMCUComment: error });
                            }}
                        />
                    </div>
                }

                <div className={classes.row}>
                    <FormControl
                        id="appRequestType"
                        fullWidth
                        disabled={disabled}
                        ReviewEnable={ReviewEnable}
                        className={classes.itemTextField}
                        commentValue={this.state.appRequestTypeComment}
                        onCommentError={error => {
                            this.setState({ appRequestTypeComment: error });
                        }}
                        error={this.state.appRequestTypeError}>
                        <InputLabel htmlFor="appRequestType">{Strings.PROJECT_NEW_APP_DEVTYPE}</InputLabel>
                        <Select
                            value={this.state.appRequestType}
                            onChange={event => {
                                const text = event.target.value;
                                this.setState({ appRequestType: text });

                                // if (text.length > 0) {
                                //     this.callAjax();
                                // }
                            }}
                        >
                            {AppRequestTypes.map(dic => (
                                <MenuItem key={dic[0]} value={dic[0]}>
                                    <ListItemText primary={dic[1]} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                {
                    (
                        this.state.appRequestType === 'appbasic_new' ||
                        this.state.appRequestType === 'appbasic_modify'
                    ) &&
                    <div className={classes.InnerLayer_row}>
                        <TextField
                            id="appName"
                            className={classes.itemTextField}
                            disabled={disabled}
                            ReviewEnable={ReviewEnable}
                            required
                            fullWidth
                            error={this.state.appNameError}
                            helperText={this.state.appNameHelper}
                            label={Strings.AMAZON_APP_NAME}
                            onChange={event => {
                                this.setState({ appName: event.target.value }, () => {
                                    const { appName } = this.state;
                                    if (appName.length >= 30) {
                                        this.setState({ appNameError: true, appNameHelper: Strings.APP_NAME_TOOLONG });
                                    } else if (appName.length > 0) {
                                        this.setState({
                                            checkingAppName: true,
                                            appNameError: false,
                                            appNameHelper: Strings.APP_NAME_HELPER
                                        });
                                        // this.callAjax();
                                    }
                                });
                            }}
                            commentValue={this.state.appNameComment}
                            onCommentError={error => {
                                this.setState({ appNameComment: error });
                            }}
                        />
                        {
                            (
                                this.state.appRequestType === 'appbasic_modify' &&
                                this.state.appName.length > 0 &&
                                !this.state.appNameError &&
                                !this.state.checkingAppName
                            ) &&
                            <CheckIcon className={classes.appNameCheck} color="primary" />
                        }
                    </div>
                }

                <div className={classes.row}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.IOTSupport}
                                onChange={event => {
                                    this.setState({ IOTSupport: event.target.checked });
                                }}
                                color="primary"
                            />
                        }
                        label={Strings.PROJECT_NEW_IOT_SUPPORT}
                    />
                </div>


                <Typography variant="h6" gutterBottom className={classes.title}>
                    {Strings.PROJECT_3PCERTIFICATE}
                </Typography>
                <Typography variant="caption" gutterBottom>
                    {Strings.PROJECT_NEW_3PCERTIFICATE_NOTE}
                </Typography>

                <div className={classes.row}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.airplay2}
                                onChange={event => {
                                    this.setState({ airplay2: event.target.checked });
                                }}
                                color="primary"
                            />
                        }
                        label="Airplay2"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.deezerBuiltIn}
                                onChange={event => {
                                    this.setState({ deezerBuiltIn: event.target.checked });
                                }}
                                color="primary"
                            />
                        }
                        label="Deezer built-in"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.qplay}
                                onChange={event => {
                                    this.setState({ qplay: event.target.checked });
                                }}
                                color="primary"
                            />
                        }
                        label="QPlay"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state._3pda}
                                onChange={event => {
                                    this.setState({ _3pda: event.target.checked });
                                }}
                                color="primary"
                            />
                        }
                        label="3PDA"
                    />
                </div>


                <Typography variant="h6" gutterBottom className={classes.title}>
                    {Strings.PROJECT_DEVICE_SIXSIDE}
                </Typography>
                <div className={classes.row}>
                    <LinkplayDropZone
                        title={Strings.PROJECT_NEW_SIXSIDE_SPEC}
                        accept="image/*"
                        previewType="png"
                        uploading={false}
                        zoneStyle={{ width: 225, height: 225 }}
                        error={this.state.sixSideImageError}
                        helperText={this.state.sixSideImageHelper}
                        preview={this.state.sixSideImageThumbnail}
                        checkDropFile={(image) => {
                            if (image.width >= 1280 && image.height >= 720) {
                                return true;
                            }
                            this._Snackbar('error', Strings.PROJECT_NEW_IMAGE_SIZE_NOTE)
                            return false;
                        }}
                        onUploadImage={(formData) => {
                            // 上传图片
                            this.props.onUploadImage(formData);
                        }}
                    />
                </div>


                <div className={classes.row}>
                    <Typography variant="h6">
                        {Strings.PROJECT_PRD_DOCUMENT}
                    </Typography>
                    <Button
                        color="primary"
                        className={classes.platformLinkButton}
                        onClick={() => {
                            this.props.downloadPRDTemplate();
                        }}>
                        {Strings.PROJECT_PRD_DOCUMENT_TEMPLATE_DOWNLOAD}
                    </Button>
                </div>

                <div className={classes.row}>
                    <FileUpload
                        uploading={false}
                        accept="application/*"
                        url={!!this.state.prdurl}
                        error={this.state.prdurlError}
                        helper={this.state.prdurlHelper}
                        onUploadFile={(formData) => {
                            this.props.onUploadFile(formData);
                        }}
                    />
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
            projectID = "",
            projectType = "",
            voiceService = ""
        } = state;
        return {
            projectID,
            projectType,
            voiceService
        };
    };

    _haveError = (state) => {
        return Utils.haveError(state);
    };

    getReviewData = (state) => {
        return Utils.getReviewData(state);
    };

}

ProductWIFIInfo.propTypes = {
    Reference: PropTypes.func,
    OnValueChange: PropTypes.func,
    OnErrorChange: PropTypes.func,
    OnReviewDataChange: PropTypes.func,
    disabled: PropTypes.bool,
    ReviewEnable: PropTypes.bool,
    initData: PropTypes.object,
    voiceService: PropTypes.string.isRequired,

    onUploadFile: PropTypes.func.isRequired,
    onUploadImage: PropTypes.func.isRequired,
    downloadPRDTemplate: PropTypes.func.isRequired,
};

// 为属性指定默认值:
ProductWIFIInfo.defaultProps = {
    disabled: false,
    ReviewEnable: false,
    initData: {},
    voiceService: 'alexa',
    SRTriggers: Array_SRTriggers,
    ProductModels: Array_ProductModels,
    AppRequestTypes: Array_AppRequestTypes,
    ProductCategories: Array_ProductCategories,
    AllDSPModels: Array_allDSPModels,
    AllMCU: Array_allMCU,
};

export default withSnackbar(withStyles(styles)(ProductWIFIInfo));