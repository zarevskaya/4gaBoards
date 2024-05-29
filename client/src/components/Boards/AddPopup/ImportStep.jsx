import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FilePicker } from '../../../lib/custom-ui';
import { Button, ButtonStyle, Icon, IconType, IconSize, Popup } from '../../Utils';

import styles from './ImportStep.module.scss';

const ImportStep = React.memo(({ onSelect, onBack }) => {
  const [t] = useTranslation();

  const handleFileSelect = useCallback(
    (type, file) => {
      onSelect({
        type,
        file,
      });

      onBack();
    },
    [onSelect, onBack],
  );

  return (
    <>
      <Popup.Header onBack={onBack}>{t('common.importBoard', { context: 'title' })}</Popup.Header>
      <Popup.Content>
        <FilePicker onSelect={(file) => handleFileSelect('trello', file)} accept=".json">
          <Button style={ButtonStyle.Popup} title={t('common.fromTrello')}>
            <Icon type={IconType.Trello} size={IconSize.Size14} className={styles.icon} />
            {t('common.fromTrello')}
          </Button>
        </FilePicker>
      </Popup.Content>
    </>
  );
});

ImportStep.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ImportStep;
