import ko from 'knockout';
import { Model } from './model';

function run(): void {
	ko.applyBindings(new Model(), document.body);
}

export { run };
export default { run };
