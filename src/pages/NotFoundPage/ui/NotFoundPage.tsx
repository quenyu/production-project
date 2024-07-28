import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = memo(() => {
	const { t } = useTranslation();

	return (
		<div className={classNames(styles.NotFoundPage, {}, [])}>
			{t('Страница не найдена')}
		</div>
	);
});
