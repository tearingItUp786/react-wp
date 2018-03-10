import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { configure, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pagination from '../Pagination';

configure({ adapter: new Adapter() });

const props = {
  searchTerm: '',
  categories: '',
  authors: '',
  totalPages: 5,
  currentPage: 2
};

describe('Testing pagination component', () => {
  test('Pagination renders properly', () => {
    const component = shallow(<Pagination {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('Pagination should render correct amount of Link Tags', () => {
    const component = shallow(<Pagination {...props} />);
    expect(component.find(Link).length).toEqual(props.totalPages);
  });

  test('List item with active class should have inner text that matches current page prop', () => {
    const component = render(
      <BrowserRouter>
        <Pagination {...props} />
      </BrowserRouter>
    );

    const { currentPage } = props;

    expect(
      component
        .find('.active')
        .children()
        .text()
    ).toEqual(currentPage.toString());
  });
});
