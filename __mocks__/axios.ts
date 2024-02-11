import { AxiosStatic } from 'axios';

export default jest.createMockFromModule('axios') as Partial<AxiosStatic>;
