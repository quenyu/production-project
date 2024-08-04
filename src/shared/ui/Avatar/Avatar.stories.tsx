import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Avatar } from './Avatar';
import AvatarImg from '../../assets/tests/avatar.jpg';

export default {
	title: 'shared/Avatar',
	component: Avatar,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: {
		to: '/',
	},
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	size: 250,
	src: AvatarImg,
};
