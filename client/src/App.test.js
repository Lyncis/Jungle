import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import DatabaseTable from './DatabaseTable';
import DetailsDisplay from './DetailsDisplay';

configure({adapter: new Adapter()});

describe('Base', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( < App / > , div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe('Database', () => {
  it('render table with data', () => {
    const rec = [{ asin: 1, rank: '#34', category: 'Test', dimension: '23 x 43 x 43 inches' }];
    const wrapper = mount(
      <DatabaseTable content={rec} />
    );
    expect(wrapper.contains(<td>#34</td>)).toBe(true);
  });
});

describe('Display details', () => {
  it('render respond from API', () => {
    const rec = { asin: 2, rank: '#12', category: 'Test', dimension: '1,3 x 4,3 x 4,3 inches' };
    const wrapper = mount(
      <DetailsDisplay asin={rec.asin} rank={rec.rank} category={rec.dimension} />
    );
    expect(wrapper.exists('.list-group-item')).toEqual(true);
  });

  it('API respond with 4 fields', () => {
    const rec = { asin: 2, rank: '#12', category: 'Test', dimension: '1,3 x 4,3 x 4,3 inches' };
    const wrapper = mount(
      <DetailsDisplay asin={rec.asin} rank={rec.rank} category={rec.dimension} />
    );
    expect(wrapper.find('div.list-group-item')).toHaveLength(4);
  })
})