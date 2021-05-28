import React from 'react';
import {Meta, Story} from "@storybook/react";
import AppWithRedux from "../reducers/AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'TodoList/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;


const Template: Story = () => <AppWithRedux />;


export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {
};