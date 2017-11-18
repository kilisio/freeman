import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";
import autobind from "autobind-decorator";
import { HotKeys } from "react-hotkeys";

import { IDirectoryItemProps } from "props/blocks";
import { IAppContext } from "models";

import "styles/blocks/DirectoryItem.scss";

/**
 * A single directory item component.
 */
class DirectoryItem extends React.Component<IDirectoryItemProps, {}> {

    /** Validation for context types. */
    public static contextTypes = {
        theme: PropTypes.object
    }

    /** The global application context. */
    public context: IAppContext;

    /**
     * Handler functions for the given events this component handles.
     */
    private handlers = {
        openDirectory: this.openDirectory
    };

    /**
     * Defines how the directory item component is rendered
     *
     * @returns - a JSX element representing the directory item view
     */
    public render(): JSX.Element {
        const selectedClass = this.props.isSelected ? "selected" : "";
        const { colour, backgroundColour } = this.context.theme.directoryItem;
        const style: React.CSSProperties = {
            color: colour || "inherit",
            backgroundColor: backgroundColour || "inherit",
            border: "none"
        };

        return <HotKeys
            handlers={this.handlers}
            ref={component => component && this.props.isSelected && this.autoFocus(component)}>
            <div className={`DirectoryItem ${selectedClass}`}>
                <button style={style} onDoubleClick={this.openDirectory}>
                    {this.props.model.name}
                </button>
            </div>
        </HotKeys>;
    }

    /**
     * Handles sending up the directory's path to the parent component.
     */
    @autobind
    private openDirectory() {
        if (this.props.model.isDirectory) {
            this.props.sendPathUp(this.props.model.path)
        }
    }

    /**
     * Handles focusing the appropriate directory item automatically.
     *
     * @param component - the HotKeys wrapper component to call focus on
     */
    private autoFocus(component: HotKeys) {
        (ReactDOM.findDOMNode(component) as HTMLElement).focus();
    }
}

export default DirectoryItem;