import { Component, OnInit } from "@angular/core";
import { Bluetooth } from "nativescript-bluetooth";
import { BluetoothService } from "./bluetooth.service";
var bluetooth = new Bluetooth();

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {

    constructor(
        public bluetoothService: BluetoothService
    ) {
        console.log('Creating ScanComponent');
    }

    doIsBluetoothEnabled() {
        this.bluetoothService.checkBluetoothEnabled();
    }

    doStartScanning(serviceUUIDs?: string[], seconds?: number) {

        this.bluetoothService.scanForPeripherals(serviceUUIDs, seconds); //BLE

        // bluetooth.startScanning({
        //   skipPermissionCheck: true,
        //   seconds: 15,
        //   onDiscovered: function (peripheral) {
        //     this.showAlert(peripheral.UUID);
        //     // console.log("Periperhal found with UUID: " + peripheral.UUID);
        //   }
        // }).then(function (e) {
        //   console.dir(e);
        //   console.log("scanning complete");
        // }, function (err) {
        //   console.log("error while scanning: " + err);
        // });
    }

    doStopScanning() {
        this.bluetoothService.stopScanForPeripherals();
        const peripheral = this.bluetoothService.peripheralList;
        console.log('scanning end')
        console.dir(peripheral);
    }

    ngOnInit() {
        bluetooth.enable().then(
            function (enabled) {
                console.log(enabled)
            }
        );
    }

    showAlert(msg: string) {
        alert({
            message: msg,
            okButtonText: "Ok"
        })
    }
}
