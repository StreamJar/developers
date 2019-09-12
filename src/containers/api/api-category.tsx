import { Button } from '@streamjar/ui-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { IState } from '../../store/state';

import * as sidebarStyles from '../../components/sidebar.scss';

export interface IApiCategoryOwnProps {
	categoryName: string;
	onClick(): void;
}

export interface IApiCategoryProps {
	category: { name: string; groups: string[] };
	groups: { name: string; endpoints: string[]; internal: boolean; subGroup: string | null }[];
}

export type ApiCategory = IApiCategoryOwnProps & IApiCategoryProps;

class ApiCategoryComponent extends React.Component<ApiCategory> {
	public render() {
		const { categoryName, groups } = this.props;

		let nll: any[] = [];
		const a: { [key: string]: any[] } = {};

		groups.forEach(i => {
			if (i.subGroup === null) {
				nll.push(i);
			} else {
				a[i.subGroup] = [...(a[i.subGroup] || []), i];
			}
		});

		nll = nll.filter(i => i.subGroup === null)
			.sort((a, b) => a.name.localeCompare(b.name));

		Object.keys(a).sort((a, b) => a.localeCompare(b)).forEach(key => {
			nll = nll.concat(...(a[key].sort((a, b) => a.name.localeCompare(b.name))));
		});

		const g = nll;

		let last: string | null;

		return (
			<React.Fragment>
				<h5 className={sidebarStyles.sidebar__title}> {categoryName} </h5>
				{g.map(i => { // tslint:disable-line
					const isDifferent = last !== i.subGroup && i.subGroup !== null;
					last = i.subGroup;

					return (
						<>
							{isDifferent && <h6 className={sidebarStyles.subGroup}>{i.subGroup}</h6>}
							<Link key={i.name} to={`/api/${categoryName}/${i.name}`}>{this.getButton(i)}</Link>
						</>
					);
				})}
			</React.Fragment>
		);
	}

	private getButton = (i: { name: string; endpoints: string[]; internal: boolean; subGroup: string | null }): JSX.Element => {
		return (
			<Button onClick={this.props.onClick} icon={i.internal ? 'vpn_key' : ''} colour={i.internal ? 'danger' : 'primary'}>
				{i.name}
			</Button>
		);
	}
}

function mapStateToProps(state: IState, props: IApiCategoryOwnProps): IApiCategoryProps {
	return {
		category: state.apiDocs.entities.categories[props.categoryName],
		groups: state.apiDocs.entities.categories[props.categoryName].groups
			.map(i => state.apiDocs.entities.groups[i]),
	};
}

export default connect(mapStateToProps)(ApiCategoryComponent);
