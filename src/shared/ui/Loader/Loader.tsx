import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Loader.module.scss';

export const Loader = () => (
	<span className={classNames(styles.Loader, {}, [])} />
);
