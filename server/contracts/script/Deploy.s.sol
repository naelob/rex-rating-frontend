// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/SchemaRegistry.sol";
import "../src/EAS.sol";
import "../src/RestaurantReviews.sol";


contract DeployScript is Script {
    function run() external {
        vm.startBroadcast();
        SchemaRegistry schemaRegistry = new SchemaRegistry();
        EAS eas = new EAS(ISchemaRegistry(schemaRegistry));
        new RestaurantReviews(EAS(eas), IWorldID(address(uint160(uint256(keccak256("0x719683F13Eeea7D84fCBa5d7d17Bf82e03E3d260"))))));
        vm.stopBroadcast();
    }
}