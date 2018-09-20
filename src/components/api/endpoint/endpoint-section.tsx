import * as React from 'react';

import * as styles from './endpoint-section.scss';

export interface IEndpointSectionProps {
	name: string;
}

export class EndpointSection extends React.PureComponent<IEndpointSectionProps> {

	public render(): JSX.Element {
		const { children, name } = this.props;

		return (
			<React.Fragment>
				<h5 className={styles.section__title}> {name} </h5>
				<hr className={styles.section__seperator}/>
				{children}
			</React.Fragment>
		);
	}
}
