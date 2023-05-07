import ko from 'knockout';
import { Model } from './model';

export { run };
export default { run };

function run(): void {
	ko.applyBindings(new Model(), document.body);
}

