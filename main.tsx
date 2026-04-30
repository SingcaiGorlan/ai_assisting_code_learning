import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import 'antd/dist/reset.css';
import "@radix-ui/themes/styles.css";
// 导入 Theme 组件
import { Theme } from '@radix-ui/themes';


// 新增 MyApp 组件
export default function MyApp() {
    return (
        <Flex direction="column" gap="2">
            <Text>Hello from Radix Themes :)</Text>
            <Button>Let's go</Button>
        </Flex>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        // 将根组件包裹在 Theme 组件中
        <Theme>
            <MyApp />
        </Theme>
    </React.StrictMode>
);
