import React from "react";
import ReactDOM from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';


export default class ComponentsLoadingModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          selectedComponent: null,
        };
      }
    
      handleComponentClick = (component) => {
        console.log("inside of handleComponentClick function in the component componentsLoadingModal");
        this.setState({ selectedComponent: component });
      };
    
      handleSubmit = () => {
        const { selectedComponent } = this.state;
        const { onClose, onLoadComponent } = this.props; 
    
        if (selectedComponent) {
          onLoadComponent(selectedComponent);  
          onClose(); 
        } else {
          alert("Please select a component to load.");
        }
      };

      trimMicroscopeName(name) {
        if (typeof name !== "string") return name;
        const underscores = [];
        for (let i = name.length - 1; i >= 0; i--) {
            if (name[i] === "_") underscores.push(i);
            if (underscores.length === 2) break;
        }
        if (underscores.length < 2) return name; 
        return name.slice(underscores[1] + 1);
        }

        buildTreeData(components) {
            const wrapStyle = {
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                overflowWrap: 'anywhere',
                maxWidth: '90%', // or whatever fits your design
                display: 'inline-block',
                verticalAlign: 'top'
            };
        
            return Object.entries(components).map(([manufacturer, models]) => ({
                title: <span style={wrapStyle}>{manufacturer}</span>,
                key: manufacturer,
                children: Object.entries(models).map(([model, entries]) => ({
                    title: <span style={wrapStyle}>{model}</span>,
                    key: `${manufacturer}|${model}`,
                    children: Object.entries(entries).map(([entryKey, entryObj]) => ({
                        title: <span style={wrapStyle}>{entryObj.component.Name}</span>,
                        key: `${manufacturer}|${model}|${entryKey}`,
                        isLeaf: true,
                        component: entryObj.component
                    }))
                }))
            }));

            // return Object.entries(components).map(([manufacturer, models]) => ({
            //     title: manufacturer,
            //     key: manufacturer,
            //     children: Object.entries(models).map(([model, entries]) => ({
            //         title: model,
            //         key: `${manufacturer}|${model}`,
            //         children: Object.entries(entries).map(([entryKey, entryObj]) => ({
            //             title: entryObj.component.Name,
            //             key: `${manufacturer}|${model}|${entryKey}`,
            //             isLeaf: true,
            //             component: entryObj.component
            //         }))
            //     }))
            // }));
        }

        findTreeKeyForComponent(selectedComponent, components) {
            for (const [manufacturer, models] of Object.entries(components)) {
                for (const [model, entries] of Object.entries(models)) {
                    for (const [entryKey, entryObj] of Object.entries(entries)) {
                        if (entryObj.component === selectedComponent) {
                            return `${manufacturer}|${model}|${entryKey}`;
                        }
                    }
                }
            }
            return '';
        }
        

    
    render() {
        const { components, onClose, schema, inputData } = this.props;
        const { selectedComponent } = this.state;
        const filteredInputData = {};
        Object.entries(inputData || {}).forEach(([key, value]) => {
            if (!Array.isArray(value)) {
                filteredInputData[key] = value;
            }
        });

        const mergedData = {
            ...filteredInputData,
            ...selectedComponent
        };

        const categoryMap = {};
        const arrayCategories = {};

        const allKeys = Object.keys(schema?.properties || {});

        console.log("selectedComponent in the component componentsLoadingModal", selectedComponent)

        allKeys.forEach(key => {
            const prop = schema.properties[key];
            if (!prop) return;
            const category = prop.category || "General";

            if (selectedComponent != null && prop && prop.type === "array" && mergedData[key] !== undefined) {
                let elements = mergedData[key];

                if (Array.isArray(elements) && elements.length === 1 && Array.isArray(elements[0])) {
                    elements = elements[0];
                }

                if (!Array.isArray(elements) && typeof elements === "object" && elements !== null) {
                    elements = Object.values(elements);
                }

                arrayCategories[key] = {
                    itemSchema: prop.items,
                    elements
                };
            } else {
                // Only include ID if selectedComponent has it
                if (key === "ID" && (!selectedComponent || selectedComponent.ID === undefined)) {
                    console.log("selectedComponent has no ID fiel");
                    return;
                }
                if (!categoryMap[category]) categoryMap[category] = [];
                categoryMap[category].push(key);
            }
        });
    
        // const allKeys = Object.keys(schema?.properties || {}).filter(
        //     (key) => key !== "ID"
        // );

        // allKeys.forEach(key => {
        //     const prop = schema.properties[key];
        //     if (!prop) return;
        //     const category = prop.category || "General";

        //     if (selectedComponent != null && prop && prop.type === "array" && mergedData[key] !== undefined) {
        //         let elements = mergedData[key];

        //         if (Array.isArray(elements) && elements.length === 1 && Array.isArray(elements[0])) {
        //             elements = elements[0];
        //         }

        //         if (!Array.isArray(elements) && typeof elements === "object" && elements !== null) {
        //             elements = Object.values(elements);
        //         }

        //         arrayCategories[key] = {
        //             itemSchema: prop.items,
        //             elements
        //         };
        //     } else {
        //         if (!categoryMap[category]) categoryMap[category] = [];
        //         categoryMap[category].push(key);
        //     }
        // });
    
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
                    height: '75%' 
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
                                {/* <ul style={{ listStyleType: 'none', padding: 0 }}>
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
                                                                        {this.trimMicroscopeName(comp.Name) || entryKey}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul> */}

                                <Tree
                                    treeData={this.buildTreeData(components)}
                                    defaultExpandAll
                                    selectable
                                    showIcon={false}
                                    selectedKeys={
                                        this.state.selectedComponent
                                            ? [this.findTreeKeyForComponent(this.state.selectedComponent, components)]
                                            : []
                                    }
                                    onSelect={(selectedKeys, { node }) => {
                                        if (node.component) {
                                            this.handleComponentClick(node.component);
                                        }
                                    }}
                                    style={{ background: 'none' }}
                                />
                            </div>
        
                            <Tabs style={{ flex: 1 }}>
                                <TabList>
                                    {tabOrder.map(category => (
                                        <Tab key={category}>{category}</Tab>
                                    ))}

                            {/* Array categories */}
                            {Object.entries(arrayCategories).map(([fieldName, { itemSchema, elements }]) => (
                                elements.map((_, index) => (
                                    <Tab key={`${fieldName}_${index}`}>
                                        {`${fieldName}_${index}`}
                                    </Tab>
                                ))
                            ))}
                                </TabList>
        
                                {tabOrder.map(category => (
                                    <TabPanel key={category}>
                                        {selectedComponent ? (
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
                                        ) : (
                                            <p style={{paddingLeft: '10px' }}>Select a component to view its details.</p>
                                        )}
                                    </TabPanel>
                                ))}

                        {/* Array category content */}
                        {Object.entries(arrayCategories).map(([fieldName, { itemSchema, elements }]) => (
                            elements.map((element, index) => (
                                <TabPanel key={`${fieldName}_${index}`}>
                                    {selectedComponent ? (
                                    <div style={{ padding: '10px 0' }}>
                                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                            <tbody>
                                                {Object.keys(element).map(key => {
                                                    const prop = (itemSchema.properties || {})[key] || {};
                                                    return (
                                                        <tr key={key} style={{ borderBottom: '1px solid #eee' }}>
                                                        <td style={{ padding: '8px', fontWeight: 500, width: '40%' }}>
                                                            {prop.description ? (
                                                            <span title={prop.description}>{key}</span>
                                                            ) : key}
                                                        </td>
                                                        <td style={{ padding: '8px', width: '60%', wordBreak: 'break-word' }}>
                                                            {element[key] !== undefined && element[key] !== null
                                                            ? element[key].toString()
                                                            : 'N/A'}
                                                        </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    )
                                    : (
                                        <p style={{paddingLeft: '10px' }}>Select a component to view its details.</p>
                                    )}
                                </TabPanel>
                            ))
                        ))}
                            </Tabs>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 15 }}>
                            <button onClick={onClose} style={{ height: "36px", 
                                fontSize: "16px", 
                                fontWeight: 500,
                                backgroundColor: "#FFFFFF",
                                color: "#030303",
                                border: "1px solid #ddd", 
                                paddingRight: "16px", 
                                paddingLeft: "16px",
                                boxShadow: "none", 
                                borderRadius: "4px", 
                                cursor: "pointer",
                                marginRight: "8px" }}>Close</button>
                            <button onClick={this.handleSubmit} disabled={!selectedComponent} style={{ height: "36px", 
                                fontSize: "16px", 
                                fontWeight: 500,
                                backgroundColor: "#4099AB",
                                color: "#FFFFFF",
                                border: "1px solid #7ab8c4", 
                                paddingRight: "18px", 
                                paddingLeft: "18px",
                                borderRadius: "4px", 
                                boxShadow: "none", 
                                opacity: selectedComponent ? 1 : 0.6 }}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>,
            this.props.overlaysContainer
        );
    }    
  }