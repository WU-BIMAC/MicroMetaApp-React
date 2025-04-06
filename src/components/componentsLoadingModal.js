import React from "react";

export default class ComponentsLoadingModal extends React.PureComponent {
    constructor(props) {
        super(props);
        console.log("called ComponentsLoadingModal");
        console.log("props.components", props.components);
        console.log("props.onClose", props.onClose);
    }

    render() {
      const { components, onClose } = this.props;
      
      return (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Component Details</h2>
            <button onClick={onClose}>Close</button>
            <div className="components-list">
              {components && components.map((comp, index) => (
                <div key={index} className="component-card">
                  <h3>{comp.Name || 'Unnamed Component'}</h3>
                  <pre>{JSON.stringify(comp, null, 2)}</pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }