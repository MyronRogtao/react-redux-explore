import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';
import NavigationItems from '../NavigationItems/NavigationItems';
import Toolbar from './Toolbar';

configure({adapter: new Adapter()})

describe('<Toolbar/>', () => {
    it('should render toolbar with nav items', () => {
        const comp = shallow(<Toolbar />);
        expect(comp.find(NavigationItems)).toHaveLength(1);
    })
})