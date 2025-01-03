import globalReducer, {
    InitialStateTypes,
    setIsSidebarCollapsed,
    setIsDarkMode,
} from './index';

describe('globalSlice', () => {
    const initialState: InitialStateTypes = {
        isSidebarCollapsed: false,
        isDarkMode: false,
    };

    it('should return the initial state', () => {
        expect(globalReducer(undefined, { type: "" })).toEqual(initialState);
    });

    it('should handle setIsSidebarCollapsed', () => {
        const actual = globalReducer(initialState, setIsSidebarCollapsed(true));
        expect(actual.isSidebarCollapsed).toEqual(true);
    });

    it('should handle setIsDarkMode', () => {
        const actual = globalReducer(initialState, setIsDarkMode(true));
        expect(actual.isDarkMode).toEqual(true);
    });
});