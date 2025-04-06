import React from "react";
import ReactDOM from 'react-dom';

export default class ComponentsLoadingModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          selectedComponent: null,
        };
      }
    
      handleComponentClick = (component) => {
        this.setState({ selectedComponent: component });
      };
    
      handleSubmit = () => {
        const { selectedComponent } = this.state;
        const { onClose, onLoadComponent } = this.props; // Access onLoadComponent
    
        if (selectedComponent) {
          onLoadComponent(selectedComponent);  // Call the function to load the component
          onClose(); // Close the modal after loading
        } else {
          alert("Please select a component to load.");
        }
      };
    
      render() {
        const { components, onClose } = this.props;
        const { selectedComponent } = this.state;
    
        return ReactDOM.createPortal(
          <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 1001
          }}>
            <div className="modal-content" style={{
              backgroundColor: 'white', padding: 20, borderRadius: 8,
              maxWidth: '90vw', maxHeight: '90vh', overflow: 'auto',
              display: 'flex', flexDirection: 'column', width: '80%'  // Column layout
            }}>
    
              <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
    
                {/* List Column */}
                <div style={{ width: '30%', paddingRight: 10, borderRight: '1px solid #ccc', overflowY: 'auto' }}>
                  <h4>List</h4>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {components?.map((comp, index) => (
                      <li key={index} style={{
                        padding: '5px 0', cursor: 'pointer',
                        fontWeight: selectedComponent === comp ? 'bold' : 'normal'
                      }}
                        onClick={() => this.handleComponentClick(comp)}
                      >
                        {comp.Name}
                      </li>
                    ))}
                  </ul>
                </div>
    
                {/* Keys Column */}
                <div style={{ width: '35%', padding: '0 10px', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
                  <h4>Keys</h4>
                  {selectedComponent ? (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {Object.keys(selectedComponent).map((key, index) => (
                        <li key={index} style={{ padding: '5px 0' }}>
                          {key}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Select a component to view its details.</p>
                  )}
                </div>
    
                {/* Values Column */}
                <div style={{ width: '35%', paddingLeft: 10, overflowY: 'auto' }}>
                  <h4>Values</h4>
                  {selectedComponent ? (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                      {Object.values(selectedComponent).map((value, index) => (
                        <li key={index} style={{ padding: '5px 0' }}>
                          {String(value)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Select a component to view its details.</p>
                  )}
                </div>
              </div>
    
    
              {/* Buttons at the bottom */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 15 }}>
                <button onClick={onClose} style={{ marginRight: 10 }}>Close</button>
                <button onClick={this.handleSubmit} disabled={!selectedComponent}>Submit</button>
              </div>
            </div>
          </div>,
          this.props.overlaysContainer
        );
    }
  }