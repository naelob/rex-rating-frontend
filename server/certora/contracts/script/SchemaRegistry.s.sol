// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/SchemaRegistry.sol";
import "../src/EAS.sol";

contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();
        SchemaRegistry schemaRegistry = new SchemaRegistry();
        new EAS(ISchemaRegistry(schemaRegistry));
        vm.stopBroadcast();
    }
}