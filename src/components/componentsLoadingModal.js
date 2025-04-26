import React from "react";
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
        const { components, onClose, schema, inputData } = this.props;
        const { selectedComponent } = this.state;
        const mergedData = {
            ...inputData, 
            ...selectedComponent 
        };

        const SubmitButton = {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			height: "44px",
			fontSize: "18px",
			fontWeight: 500,
			backgroundColor: "#4099AB",
			color: "#FFFFFF",
			borderColor: "#5d8f99",
			paddingRight: "25px",
			paddingLeft: "25px",
			borderRadius: "8px",
		};
		const CancelButton = {
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-start",
			height: "44px",
			fontSize: "18px",
			fontWeight: 500,
			backgroundColor: "#FFFFFF",
			color: "#030303",
			borderColor: "#FFFFFF",
			paddingRight: "20px",
			paddingLeft: "20px",
		};
    
        // console.log("     **** schema in componentsLoadingModal:", schema);
        // console.log("     **** selectedComponent in componentsLoadingModal:", selectedComponent);
        // console.log("     ** mergedData in componentsLoadingModal", mergedData);
    
        const allKeys = Object.keys(schema?.properties || {}).filter(
            (key) => key !== "ID"
        );
        
        // Group properties by category
        const categoryMap = {};
        allKeys.forEach((key) => {
            const prop = schema.properties[key];
            const category = prop.category || "General";
            if (!categoryMap[category]) categoryMap[category] = [];
            categoryMap[category].push(key);
        });
    
        // Get tab order from schema or use alphabetical
        const tabOrder = Array.isArray(schema?.subCategoriesOrder)
            ? schema.subCategoriesOrder
            : Object.keys(categoryMap).sort();
    
        return ReactDOM.createPortal(
            <div className="modal-overlay" style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1001
            }}>
                <div className="modal-content" style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 8,
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '75%',
                    height: '75%'  // Column layout
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                            {/* List Column */}
                            <div style={{
                                width: '30%',
                                paddingRight: 10,
                                borderRight: '1px solid #ccc',
                                overflowY: 'auto',
                                wordBreak: 'break-word'
                            }}>
                                <h4>List</h4>
                                <ul style={{ listStyleType: 'none', padding: 0 }}>
                                    {Object.entries(components).map(([manufacturer, models]) => (
                                        <li key={manufacturer}>
                                            <strong>{manufacturer}</strong>
                                            <ul style={{ listStyleType: 'none', paddingLeft: 15 }}>
                                                {Object.entries(models).map(([model, entries]) => (
                                                    <li key={model}>
                                                        <em>{model}</em>
                                                        <ul style={{ listStyleType: 'none', paddingLeft: 15 }}>
                                                            {Object.entries(entries).map(([entryKey, entryObj]) => {
                                                                const comp = entryObj.component;
                                                                const isSelected = selectedComponent === comp;
                                                                return (
                                                                    <li
                                                                        key={entryKey}
                                                                        style={{
                                                                            padding: '3px 0',
                                                                            cursor: 'pointer',
                                                                            fontWeight: isSelected ? 'bold' : 'normal',
                                                                            color: isSelected ? '#007BFF' : 'black'
                                                                        }}
                                                                        onClick={() => this.handleComponentClick(comp)}
                                                                    >
                                                                        {comp.Name || entryKey}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
        
                            <Tabs style={{ flex: 1 }}>
                                <TabList>
                                    {tabOrder.map(category => (
                                        <Tab key={category}>{category}</Tab>
                                    ))}
                                </TabList>
        
                                {tabOrder.map(category => (
                                    <TabPanel key={category}>
                                        <div style={{ padding: '10px 0', overflowY: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <tbody>
                                                    {categoryMap[category]?.map(key => {
                                                        const prop = schema.properties[key];
                                                        return (
                                                            <tr key={key} style={{ borderBottom: '1px solid #eee' }}>
                                                                <td style={{
                                                                    padding: '8px',
                                                                    fontWeight: 500,
                                                                    width: '40%',
                                                                    verticalAlign: 'top',
                                                                    wordBreak: 'break-word'
                                                                }}>
                                                                    {prop.description ? (
                                                                        <span title={prop.description}>
                                                                            {key}
                                                                        </span>
                                                                    ) : key}
                                                                </td>
                                                                <td style={{
                                                                    padding: '8px',
                                                                    width: '60%',
                                                                    wordBreak: 'break-word'
                                                                }}>
                                                                    {mergedData[key]?.toString() || 'N/A'}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </TabPanel>
                                ))}
                            </Tabs>
                        </div>
                    
    
                        {/* Buttons at the bottom */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 15 }}>
                            <button onClick={onClose} style={{ height: "36px", // Smaller height
            fontSize: "16px", // Smaller font size
            fontWeight: 500,
            backgroundColor: "#FFFFFF",
            color: "#030303",
            border: "1px solid #ddd", // Less harsh border
            paddingRight: "16px", // Adjust padding
            paddingLeft: "16px",
            boxShadow: "none", // Remove shadow
            borderRadius: "4px", // Soften border-radius
            cursor: "pointer",
            marginRight: "8px" }}>Close</button>
                            <button onClick={this.handleSubmit} disabled={!selectedComponent} style={{ height: "36px", // Smaller height
            fontSize: "16px", // Smaller font size
            fontWeight: 500,
            backgroundColor: "#4099AB",
            color: "#FFFFFF",
            border: "1px solid #7ab8c4", // Less harsh border
            paddingRight: "18px", // Adjust padding
            paddingLeft: "18px",
            borderRadius: "4px", // Soften border-radius
            boxShadow: "none", // Remove shadow
            opacity: selectedComponent ? 1 : 0.6 }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>,
            this.props.overlaysContainer
        );
    }    
  }