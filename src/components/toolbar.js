import React from "react";
import { ImageElement } from "./imageElement";
import Collapsible from "react-collapsible";
import { DragDropContainer } from "react-drag-drop-container";

export class Toolbar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			elementList: {}
		};
		for (let i = 0; i < props.schema.length; i++) {
			let obj = props.schema[i];
			let category = obj.category;
			let element = {
				id: `${i}`,
				schema: obj
			};
			if (this.state.elementList[category] === undefined) {
				this.state.elementList[category] = [];
			}
			this.state.elementList[category].push(element);
		}
	}

	createCategoryItems(key) {
		let elementList = this.state.elementList;
		let categoryItems = elementList[key].map(item => (
			<DragDropContainer
				targetKey="dragdrop"
				key={"draggable" + item.id}
				dragClone={true}
				dragData={{
					source: "toolbar",
					id: item.id,
					schema: item.schema
				}}
			>
				<ImageElement
					id={item.id}
					image={`${this.props.imagesPath}${item.schema.image}`}
					name={item.schema.title}
				/>
			</DragDropContainer>
		));
		return <div style={{ flexWrap: "wrap" }}>{categoryItems}</div>;
	}

	createCategories() {
		let elementList = this.state.elementList;
		let toolbar = [];
		Object.keys(elementList).forEach(key =>
			toolbar.push(
				<Collapsible key={key} trigger={key}>
					{this.createCategoryItems(key)}
				</Collapsible>
			)
		);
		//console.log(toolbar);
		return toolbar;
	}

	render() {
		const style = {
			//display: "inline-block",
			boxSizing: "border-box",
			backgroundColor: "grey",
			textAlign: "center",
			verticalAlign: "middle",
			borderBottom: "2px solid",
			borderTop: "2px solid",
			//border: "3px solid",
			color: "black",
			WebkitBoxOrdinalGroup: "2", // OLD - iOS 6-, Safari 3.1-6
			MozBoxOrdinalGroup: "2", // OLD - Firefox 19-
			msFlexOrder: "2", // TWEENER - IE 10
			WebkitOrder: "2", // NEW - Chrome
			order: "2", // NEW, Spec - Opera 12.1, Firefox 20+
			WebkitBoxFlex: "1", // OLD - iOS 6-, Safari 3.1-6
			MozBoxFlex: "1", // Firefox 19-
			width: "25%", // For OLD syntax, otherwise collapses.
			msFlex: "1", // TWEENER - IE 10
			WebkitFlex: "1", // NEW - Chrome
			flex: "1", // NEW, Spec - Opera 12.1, Firefox 20+
			OverflowEvent: "hidden"
		};
		let toolbar = this.createCategories();
		return <div style={style}>{toolbar}</div>;
	}
}
