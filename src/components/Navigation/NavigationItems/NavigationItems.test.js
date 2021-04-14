import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';

configure({adapter: new Adapter()})
describe('<NaviationItems />', () => {

    it('should render 1 nav item when not authenticated', () => {
        // const component = shallow(<NavigationItems />);
        // need to find a way to provide redux context
    })
})