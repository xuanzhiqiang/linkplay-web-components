import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import Dropzone from "react-dropzone";
import { withSnackbar } from "notistack";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import { Strings } from "../config/Config";


const styles = theme => ({
    rootStyle: {
        display: "flex",
        flexDirection: "column",
    },
    titleStyle: {
        display: "flex",
        alignItems: "center",
    },
    zoneStyle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    defaultImageStyle: {
        flexGrow: 1,
        minWidth: "64px",
        minHeight: "64px",
        objectFit: "contain",
    },
    imageStyle: {
        width: "auto",
        height: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "hidden",
    },
    normalStyle: {
        borderStyle: "dashed",
        borderWidth: 2,
        color: "gray",
        borderRadius: 5,
    },
    errorStyle: {
        borderStyle: "dashed",
        borderWidth: 2,
        color: "red",
        borderRadius: 5,
    },
    progress: {
        width: "100%",
        position: 'absolute',
        top: 0
    },
    titleText: {},
    errorText: { color: "red" },
    normalText: {},
    helperText: {
        marginTop: theme.spacing(1.5),
    }
});


class LinkplayDropZone extends React.Component {
    constructor(props) {
        super(props);

        this.image = null;
        this.state = {
            error: props.error,
            previewImage: props.previewImage,
        };
    }

    componentDidMount() {
        this._renderPreview(this.props, {});
    }

    componentWillReceiveProps(nextProps) {
        this._renderPreview(this.props, nextProps);

        const { error, previewImage } = nextProps;
        if (error !== this.state.error) {
            this.setState({ error });
        }
        if (previewImage !== this.state.previewImage) {
            this.setState({ previewImage });
        }
    }

    _renderPreview = (props, nextProps) => {
        const { preview: prePreview, previewType: preType } = props;
        const { preview, previewType } = nextProps;
        if (prePreview !== preview || preType !== previewType) {
            let previewImage = '';
            if (preview) {
                if (previewType === "svg") {
                    previewImage = `data:image/svg+xml;utf-8,${preview}`;
                } else {
                    previewImage = `data:image/png;base64,${preview}`;
                }
            }
            this.setState({ previewImage });
        }
    };

    get preview() {
        return this.state.previewImage;
    }

    get invalid() {
        return (!this.state.previewImage || this.state.error);
    }

    onDropAccepted = (files, event) => {
        const tempImage = files[0];
        const image = new Image();
        image.name = tempImage.name;
        image.src = URL.createObjectURL(tempImage);
        // console.log("RUL: ", image.src);
        image.addEventListener("load", () => {
            this.setState({ previewImage: image.src, error: false });
            if (this.props.checkDropFile) {
                if (this.props.checkDropFile(image)) {
                    this.uploadImage(tempImage);
                } else {
                    this.setState({ error: true });
                }
            }
        });
    };

    onDropRejected = (files, event) => {
        this.setState({ error: true });
        this._Snackbar('error', Strings.PROJECT_NEW_IMAGE_FORMT_ERROR);
    };

    _Snackbar = (variant, str) => {
        this.props.enqueueSnackbar(str, { variant, autoHideDuration: 3000 });
    }

    uploadImage = file => {
        let formData = new FormData();
        formData.append("width", this.props.zoneStyle.width);
        formData.append("height", this.props.zoneStyle.height);
        formData.append("file", file);

        this.props.onUploadImage && this.props.onUploadImage(formData);
    };

    render() {
        const { title, accept, classes, zoneStyle, disabled, uploading, helperText } = this.props;
        const { error } = this.state;
        return (
            <div>
                <Dropzone
                    accept={accept}
                    disabled={disabled}
                    onDropAccepted={this.onDropAccepted}
                    onDropRejected={this.onDropRejected}>
                    {
                        ({ getRootProps, getInputProps }) => (
                            <div className={classes.rootStyle}>
                                <div className={classes.titleStyle}>
                                    <Typography
                                        variant="body1"
                                        className={classNames(classes.titleText, error ? classes.errorText : classes.normalText)}
                                        gutterBottom >
                                        {title}
                                    </Typography>
                                </div>
                                <div style={zoneStyle} {...getRootProps()}
                                    className={classNames(classes.zoneStyle, error ? classes.errorStyle : classes.normalStyle)}>

                                    {uploading && <LinearProgress className={classes.progress} />}

                                    <input {...getInputProps()} />

                                    {this._renderContent()}

                                </div>
                            </div>
                        )
                    }
                </Dropzone>

                <Typography
                    className={classNames(classes.helperText, error ? classes.errorText : classes.normalText)}
                    variant="body1"
                    gutterBottom>
                    {helperText}
                </Typography>
            </div>
        );
    }

    _renderContent = () => {
        const { classes, tipIcon, errorIcon } = this.props;
        const { previewImage, error } = this.state;

        if (error) {
            return (
                <img alt="" className={classes.defaultImageStyle}
                    src={errorIcon ? errorIcon : require("../resource/png-format-error.png")}
                />
            );
        }

        if (previewImage) {
            return (<img alt="" className={classes.imageStyle} src={previewImage} />);
        }

        return (
            <img alt="" className={classes.defaultImageStyle}
                src={tipIcon ? tipIcon : require("../resource/png-format.png")}
            />
        );
    };
}

LinkplayDropZone.propTypes = {
    disabled: PropTypes.bool,
    tipIcon: PropTypes.number,
    errorIcon: PropTypes.number,
    checkDropFile: PropTypes.func,
    onUploadImage: PropTypes.func,
    
    accept: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    uploading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    helperText: PropTypes.string.isRequired,
    previewType: PropTypes.string.isRequired,
    zoneStyle: PropTypes.object.isRequired,
};

// 为属性指定默认值:
LinkplayDropZone.defaultProps = {
    disabled: false
};

export default withSnackbar(withStyles(styles)(LinkplayDropZone));
