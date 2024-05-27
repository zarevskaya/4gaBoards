import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './PopupContent.module.scss';

const PopupContent = React.memo(({ children, className, ...rest }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={classNames(styles.wrapper, className)} {...rest}>
      {children}
    </div>
  );
});

PopupContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

PopupContent.defaultProps = {
  className: undefined,
};

export default PopupContent;
