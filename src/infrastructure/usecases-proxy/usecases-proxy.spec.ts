import { UseCaseProxy } from './usecases-proxy';

class MockUseCase {
    execute() {
        return 'Executed';
    }
}

describe('UseCaseProxy', () => {
    let useCaseProxy: UseCaseProxy<MockUseCase>;
    let mockUseCase: MockUseCase;

    beforeEach(() => {
        mockUseCase = new MockUseCase();
        useCaseProxy = new UseCaseProxy(mockUseCase);
    });

    it('should return the correct use case instance from getInstance()', () => {
        expect(useCaseProxy.getInstance()).toBe(mockUseCase);
    });

    it('should return the same instance every time getInstance() is called', () => {
        const instance1 = useCaseProxy.getInstance();
        const instance2 = useCaseProxy.getInstance();
        expect(instance1).toBe(instance2);
    });

    it('should return the correct result when calling methods on the use case', () => {
        const result = useCaseProxy.getInstance().execute();
        expect(result).toBe('Executed');
    });
});
