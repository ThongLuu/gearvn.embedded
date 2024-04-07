import React, { useState, useEffect, useRef  } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

import moment from 'moment';
import PropTypes from 'prop-types';
import Filter, { FilterType } from '../Filter';
import { setUrlParams, getUrlParams } from '../../utils/urlparam';
import { toastClear } from './redux/actions';
import { controllers } from '../TopBar/redux/actions';
import './style.scss';

/**
 * Standalone Page
 */
function Page({
  title,
  pageSize = 10,
  onFilterChange,
  onRequestChange,
  filters,
  content,
  isLoadData,
  filterLabel = 'Lọc',
  filterIcon = 'pi pi-filter',
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [localFilters, setLocalFilters] = useState({});

  // Effects
  useEffect(() => {
    dispatch(controllers([], [])); // Cleanup topbar
  }, []);

  // Handlers

  const handleURLParams = () => {
    const params = getUrlParams();
    if (!params.page) {
      params.page = 1;
      params.take = pageSize;
      params.to_date = moment().startOf('day').toDate();
      params.from_date = moment().startOf('day').subtract(14, 'd').toDate();
    }
    let newFilter;
    if (filters) {
      newFilter = { ...filters.data, ...localFilters, ...params };
    } else {
      newFilter = { ...localFilters, ...params };
    }
    setLocalFilters(newFilter);
    if (onFilterChange)
      onFilterChange(newFilter);
    return newFilter;
  };

  const handleApply = items => {
    const newFilter = {
      page: localFilters.page,
      take: localFilters.take,
      from_date: localFilters.from_date,
      to_date: localFilters.to_date,
      ...items
    };
    if (newFilter.sort) {
      if (newFilter.sort.column !== '') {
        newFilter.sort_column = newFilter.sort.column;
        newFilter.sort_order = newFilter.sort.type;
      }
      delete newFilter.sort;
    }
    if (!newFilter.page) newFilter.page = 1;
    if (!newFilter.take) newFilter.take = pageSize;
    if (!newFilter.from_date) {
      newFilter.from_date = moment().startOf('day').subtract(14, 'd').toDate();
    }
    if (!newFilter.to_date) {
      newFilter.to_date = moment().startOf('day').toDate();
    }
    setUrlParams(history, localFilters, newFilter);
    onRequestChange(newFilter);
    setLocalFilters(newFilter);
  };

  /**
   * Filter renderer
   */
  const renderFilters = () => {
    if (!filters || filters.items.length === 0) return null;
    return (
      <>
        <Filter {...filters} onApply={handleApply} filterLabel={filterLabel} filterIcon={filterIcon} />
      </>
    );
  };

  /**
   * Content renderer
   */
  const renderContent = () => {
    return <>{content}</>;
  };

  const renderPage = () => {
    return (
      <>
        <div className="card-body catalog g-overflow-hidden">
          <div className="filter">{renderFilters()}</div>
          <div className="g-overflow-auto">
            <div className="content">{renderContent()}</div>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    const filters = handleURLParams();
    if (isLoadData) {
      if (onRequestChange) {
        onRequestChange(filters);
      }
    }
  }, []);

  return (
    <div style={{ marginLeft: '15%', marginRight: '15%' }}>
      <Card className="p-card-noshadow" title={title}>
        {renderPage()}
      </Card>
    </div>
  );
}

Page.propTypes = {
  /**
   * A set of array to define filters. Look at Filter component for details
   */
  filters: PropTypes.shape(PropTypes.any),
  /**
   * An object contains table settings
   */
  table: PropTypes.shape({}),
  /**
   * Call when the list need to change
   */
  onRequestChange: PropTypes.any,
  /**
   * Call when filters is changed
   */
  onFilterChange: PropTypes.any,
  isShowLimit: PropTypes.bool,
  isLoadData: PropTypes.bool,
};

export default Page;
export { FilterType };
