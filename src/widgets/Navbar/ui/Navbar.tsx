import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.scss';

type NavbarProps = {
	className?: string,
}

export const Navbar = ({ className }: NavbarProps) => {
	const { t } = useTranslation();

	return (
		<div className={classNames(styles.Navbar, {}, [className])}>
			<div className={styles.links}>
				<AppLink theme={AppLinkTheme.PRIMARY} to="/">
					{t('Главная')}
				</AppLink>
				<AppLink theme={AppLinkTheme.PRIMARY} to="/about">
					{t('О сайте')}
				</AppLink>
			</div>
		</div>
	);
};
