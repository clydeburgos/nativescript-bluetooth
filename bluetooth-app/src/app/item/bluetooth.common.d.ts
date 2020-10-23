import Observable from '@nativescript-community/observable';
import { BaseError } from 'make-error';
export declare class BluetoothUtil {
    static debug: boolean;
}
export declare enum CLogTypes {
    info = 0,
    warning = 1,
    error = 2
}
export declare class BluetoothError extends BaseError {
    arguments?: any;
    method?: string;
    status?: number;
    constructor(message: string, properties?: {
        [k: string]: any;
    });
    toString(): string;
}
export declare const CLog: (type?: CLogTypes, ...args: any[]) => void;
export declare function bluetoothEnabled(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>;
export declare function prepareArgs(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>;
export declare abstract class BluetoothCommon extends Observable {
    set debug(value: boolean);
    get debug(): boolean;
    static msg_not_enabled: string;
    static msg_not_supported: string;
    static msg_cant_open_settings: string;
    static msg_missing_parameter: string;
    static msg_no_peripheral: string;
    static msg_no_service: string;
    static msg_no_characteristic: string;
    static msg_peripheral_not_connected: string;
    static msg_peripheral_disconnected: string;
    static msg_invalid_value: string;
    static msg_error_function_call: string;
    static msg_characteristic_cant_notify: string;
    static UUIDKey: string;
    static serviceUUIDKey: string;
    static peripheralUUIDKey: string;
    static characteristicUUIDKey: string;
    static bluetooth_status_event: string;
    static device_connected_event: string;
    static device_disconnected_event: string;
    static device_discovered_event: string;
    events: any;
    abstract isBluetoothEnabled(): Promise<boolean>;
    isGPSEnabled(): Promise<boolean>;
    enableGPS(): Promise<void>;
    requestLocationPermission(): Promise<boolean>;
    hasLocationPermission(): Promise<boolean>;
    sendEvent(eventName: string, data?: any, msg?: string): void;
    abstract discoverServices(args: DiscoverServicesOptions): any;
    abstract discoverCharacteristics(args: DiscoverCharacteristicsOptions): any;
    discoverAll(args: DiscoverOptions): Promise<{
        services: Service[];
    }>;
    stop(): void;
}
export declare enum ScanMode {
    LOW_LATENCY = 0,
    BALANCED = 1,
    LOW_POWER = 2,
    OPPORTUNISTIC = 3
}
export declare enum MatchMode {
    AGGRESSIVE = 0,
    STICKY = 1
}
export declare enum MatchNum {
    MAX_ADVERTISEMENT = 0,
    FEW_ADVERTISEMENT = 1,
    ONE_ADVERTISEMENT = 2
}
export declare enum CallbackType {
    ALL_MATCHES = 0,
    FIRST_MATCH = 1,
    MATCH_LOST = 2
}
export declare enum Phy {
    LE_1M = 0,
    LE_CODED = 1,
    LE_ALL_SUPPORTED = 2
}
export declare type ConnectionState = 'connected' | 'connecting' | 'disconnected';
export interface StartScanningOptions {
    filters?: {
        serviceUUID?: string;
        deviceName?: string;
        deviceAddress?: string;
        manufacturerData?: ArrayBuffer;
    }[];
    seconds?: number;
    onDiscovered?: (data: Peripheral) => void;
    skipPermissionCheck?: boolean;
    android?: {
        scanMode?: ScanMode;
        matchMode?: MatchMode;
        matchNum?: MatchNum;
        callbackType?: CallbackType;
        legacy?: boolean;
        useHardwareBatchingIfSupported?: boolean;
        reportDelay?: number;
        phy?: Phy;
    };
}
export interface DisconnectOptions {
    UUID: string;
}
export interface ConnectOptions {
    UUID: string;
    onConnected?: (data: {
        UUID: any;
        name: string;
        state: ConnectionState;
        services?: Service[];
        advertismentData: AdvertismentData;
    }) => void;
    onDisconnected?: (data: {
        UUID: any;
        name: string;
    }) => void;
    autoDiscoverAll?: boolean;
}
export interface AdvertismentData {
    localName?: string;
    manufacturerData?: ArrayBuffer;
    manufacturerId?: number;
    serviceUUIDs?: string[];
    serviceData?: {
        [k: string]: ArrayBuffer;
    };
    txPowerLevel?: number;
    flags?: number;
}
export interface Peripheral {
    UUID: string;
    name: string;
    localName?: string;
    RSSI?: number;
    services?: Service[];
    manufacturerId?: number;
    advertismentData?: AdvertismentData;
}
export interface Service {
    UUID: string;
    name?: string;
    characteristics?: Characteristic[];
}
export interface Characteristic {
    UUID: string;
    name: string;
    properties?: {
        read: boolean;
        write: boolean;
        writeWithoutResponse: boolean;
        notify: boolean;
        indicate: boolean;
        broadcast: boolean;
        authenticatedSignedWrites: boolean;
        extendedProperties: boolean;
    };
    descriptors?: any;
    permissions?: any;
}
export interface CRUDOptions {
    peripheralUUID: string;
    serviceUUID: string;
    characteristicUUID: string;
}
export interface ReadOptions extends CRUDOptions {
}
export interface WriteOptions extends CRUDOptions {
    value: any;
    encoding?: string;
}
export interface MtuOptions {
    value: any;
    peripheralUUID: string;
}
export interface DiscoverOptions {
    peripheralUUID: string;
}
export interface DiscoverServicesOptions extends DiscoverOptions {
    serviceUUIDs?: string[];
}
export interface DiscoverCharacteristicsOptions extends DiscoverOptions {
    serviceUUID: string;
    characteristicUUIDs?: string[];
}
export interface StopNotifyingOptions extends CRUDOptions {
}
export interface StartNotifyingOptions extends CRUDOptions {
    onNotify: (data: ReadResult) => void;
}
export interface ReadResult {
    value: ArrayBuffer;
    ios?: any;
    android?: any;
    characteristicUUID: string;
    serviceUUID: string;
}
export interface StartAdvertisingOptions {
    settings: any;
    UUID: any;
    data: any;
}
export interface IBluetoothEvents {
    error_event: string;
    bluetooth_enabled_event: string;
    bluetooth_status_event: string;
    peripheral_connected_event: string;
    bluetooth_advertise_success_event: string;
    bluetooth_advertise_failure_event: string;
    server_connection_state_changed_event: string;
    bond_status_change_event: string;
    device_discovered_event: string;
    device_name_change_event: string;
    device_uuid_change_event: string;
    device_acl_disconnected_event: string;
    characteristic_write_request_event: string;
    characteristic_read_request_event: string;
    descriptor_write_request_event: string;
    descriptor_read_request_event: string;
    execute_write_event: string;
}
