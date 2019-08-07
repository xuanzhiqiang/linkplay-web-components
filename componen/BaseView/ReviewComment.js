import React from "react";
import Cancel from '@material-ui/icons/Cancel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Panorama from '@material-ui/icons/PanoramaFishEye';

export function withReviewComment(Component) {

    class Comment extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                commentValue: false
            }
        }

        handleChange = (event) => {
            this.setState({ commentValue: event.target.checked }, () => {
                this.props.onCommentError && this.props.onCommentError(this.state.commentValue);
            });
        }

        componentDidMount() {
            const { commentValue } = this.props;
            if (commentValue && !this.state.commentValue) {
                this.setState({ commentValue }, () => {
                    this.props.onCommentError && this.props.onCommentError(commentValue);
                })
            }
        }

        componentWillReceiveProps(nextProps) {
            const { commentValue } = nextProps;
            if (commentValue && !this.state.commentValue) {
                this.setState({ commentValue }, () => {
                    this.props.onCommentError && this.props.onCommentError(commentValue);
                })
            }
        }

        render() {
            const { commentValue = null, onCommentError, disabled = false, ReviewEnable = false, ...ret } = this.props;
            return (
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Component disabled={disabled} {...ret} />
                        {
                            ReviewEnable &&
                            <FormControlLabel
                                disabled={disabled}
                                control={
                                    <Checkbox
                                        checked={!!commentValue}
                                        onChange={this.handleChange}
                                        icon={<Panorama />}
                                        checkedIcon={<Cancel />}
                                    />
                                }
                                label=' '
                            />
                        }

                    </div>
                </div>
            );
        }
    }
    return Comment;
}