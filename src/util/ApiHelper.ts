import { ApiDocs } from '@streamjar/frontend-common-core/models';
import { HttpService } from '@streamjar/frontend-common-core';
import { Observable, Subject } from 'rxjs';

export class InvalidResponseError extends Error {
	public statusCode: number;

	constructor(response: Response) {
		super(`Error ${response.status}`);
		this.statusCode = response.status;
		Object.setPrototypeOf(this, InvalidResponseError.prototype);
	}
}

export class JarService extends HttpService {
	constructor() {
		super({
			endpoint: 'https://jar.streamjar.tv',
			version: '2',
		});
	}

	public get<T>(uri: string): Observable<T> {
		return this.request<T>('GET', uri);
	}

	public post<T>(uri: string, body: any): Observable<T> {
		return this.request<T>('POST', uri, body);
	}

	public patch<T>(uri: string, body: any): Observable<T> {
		return this.request<T>('PATCH', uri, body);
	}

	public put<T>(uri: string, body: any): Observable<T> {
		return this.request<T>('PUT', uri, body);
	}

	public delete<T>(uri: string): Observable<T> {
		return this.request<T>('DELETE', uri);
	}

	private request<T>(method: string, url: string, body?: string): Observable<T> {
		const obs = new Subject<T>();

		let bodyValue;
		const headers: { [key: string]: string } = this.getHeaders(url);

		if (body) {
			bodyValue = JSON.stringify(body);
			headers['Content-Type'] = 'application/json';
		}

		fetch(this.buildUrl(url), {
			method: method.toUpperCase(),
			headers: headers,
			body: bodyValue,
		}).then((value) => {
			if (!value.ok) {
				throw new InvalidResponseError(value);
			}

			if (value.status === 204) {
				return null;
			}

			return value.json();
		}).then(value => {
			obs.next(value);
			obs.complete();
		}).catch((err) => {
			obs.error(err);
			obs.complete();
		});

		return obs;
	}
}

export function getApi<T>(item: new (a: HttpService) => T): T {
	const api = new JarService();

	return new (<any>item)(api);
}
