import { EnvironmentConfigService } from './environment-config.service';
import { ConfigService } from '@nestjs/config';

describe('EnvironmentConfigService', () => {
  let environmentConfigService: EnvironmentConfigService;
  let mockConfigService: jest.Mocked<ConfigService>;

  beforeEach(() => {
    mockConfigService = {
      get: jest.fn(),
    } as unknown as jest.Mocked<ConfigService>; // Explicitly type the mock as a Jest mock

    environmentConfigService = new EnvironmentConfigService(mockConfigService);
  });

  it('should return database host', () => {
    const mockHost = 'localhost';
    mockConfigService.get.mockReturnValue(mockHost);

    const result = environmentConfigService.getDatabaseHost();
    expect(result).toBe(mockHost);
    expect(mockConfigService.get).toHaveBeenCalledWith('DATABASE_HOST');
  });

  it('should return database port', () => {
    const mockPort = 5432;
    mockConfigService.get.mockReturnValue(mockPort);

    const result = environmentConfigService.getDatabasePort();
    expect(result).toBe(mockPort);
    expect(mockConfigService.get).toHaveBeenCalledWith('DATABASE_PORT');
  });

  it('should return database user', () => {
    const mockUser = 'admin';
    mockConfigService.get.mockReturnValue(mockUser);

    const result = environmentConfigService.getDatabaseUser();
    expect(result).toBe(mockUser);
    expect(mockConfigService.get).toHaveBeenCalledWith('DATABASE_USER');
  });

  it('should return database password', () => {
    const mockPassword = 'password123';
    mockConfigService.get.mockReturnValue(mockPassword);

    const result = environmentConfigService.getDatabasePassword();
    expect(result).toBe(mockPassword);
    expect(mockConfigService.get).toHaveBeenCalledWith('DATABASE_PASSWORD');
  });

  it('should return database name', () => {
    const mockDbName = 'test_db';
    mockConfigService.get.mockReturnValue(mockDbName);

    const result = environmentConfigService.getDatabaseName();
    expect(result).toBe(mockDbName);
    expect(mockConfigService.get).toHaveBeenCalledWith('DATABASE_NAME');
  });

  it('should return database schema', () => {
    const mockSchema = 'public';
    mockConfigService.get.mockReturnValue(mockSchema);

    const result = environmentConfigService.getDatabaseSchema();
    expect(result).toBe(mockSchema);
    expect(mockConfigService.get).toHaveBeenCalledWith('DATABASE_SCHEMA');
  });

  it('should return database synchronize flag', () => {
    const mockSync = true;
    mockConfigService.get.mockReturnValue(mockSync);

    const result = environmentConfigService.getDatabaseSync();
    expect(result).toBe(mockSync);
    expect(mockConfigService.get).toHaveBeenCalledWith('DATABASE_SYNCHRONIZE');
  });
});
