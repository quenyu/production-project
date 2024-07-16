/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { classNames } from 'shared/lib/classNames/classNames';
import React, {
	ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';
// Убрать
import { useTheme } from 'app/providers/ThemeProvider';
import styles from './Modal.module.scss';
import { Portal } from '../Portal/Portal';

interface ModalProps {
	className?: string,
	isOpen?: boolean,
	onClose?: () => void,
	children?: ReactNode,
}

const ANIMATION_DELAY = 100;

export const Modal = ({
	className, children, isOpen, onClose,
}: ModalProps) => {
	const [isClosing, setIsClosing] = useState(false);
	// Убрать
	const { theme } = useTheme();
	const mods: Record<string, boolean> = {
		[styles.opened]: isOpen,
		[styles.isClosing]: isClosing,
		// Убрать
		[styles[theme]]: true,
	};

	const timerRef = useRef<ReturnType<typeof setTimeout>>();

	const closeHandler = useCallback(() => {
		if (onClose) {
			setIsClosing(true);
			timerRef.current = setTimeout(() => {
				onClose();
				setIsClosing(false);
			}, ANIMATION_DELAY);
		}
	}, [onClose]);

	const onContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			closeHandler();
		}
	}, [closeHandler]);

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('keydown', onKeyDown);
		}

		return () => {
			clearTimeout(timerRef.current);
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onKeyDown]);

	return (
		<Portal>
			<div className={classNames(styles.Modal, mods, [className])}>
				<div className={styles.overlay} onClick={closeHandler}>
					<div className={styles.content} onClick={onContentClick}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	);
};
