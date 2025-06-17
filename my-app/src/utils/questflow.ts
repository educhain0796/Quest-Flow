export const QUEST_ABI = {
  "address": "0x114442acbfdd65c36fb88ab977e76eefbf7225465f677aa2b73f68bc9350f545",
  "name": "questflow",
  "friends": [],
  "exposed_functions": [
    {
      "name": "initialize",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer"
      ],
      "return": []
    },
    {
      "name": "owner",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [],
      "return": [
        "address"
      ]
    },
    {
      "name": "transfer",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "address",
        "u64"
      ],
      "return": []
    },
    {
      "name": "name",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [],
      "return": [
        "0x1::string::String"
      ]
    },
    {
      "name": "symbol",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [],
      "return": [
        "0x1::string::String"
      ]
    },
    {
      "name": "decimals",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [],
      "return": [
        "u8"
      ]
    },
    {
      "name": "balance",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "address"
      ],
      "return": [
        "u64"
      ]
    },
    {
      "name": "mint",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "address",
        "u64"
      ],
      "return": []
    },
    {
      "name": "register",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer"
      ],
      "return": []
    },
    {
      "name": "total_supply",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [],
      "return": [
        "0x1::option::Option<u128>"
      ]
    },
    {
      "name": "donate",
      "visibility": "public",
      "is_entry": true,
      "is_view": false,
      "generic_type_params": [],
      "params": [
        "&signer",
        "address",
        "u64"
      ],
      "return": []
    },
    {
      "name": "is_registered",
      "visibility": "public",
      "is_entry": false,
      "is_view": true,
      "generic_type_params": [],
      "params": [
        "address"
      ],
      "return": [
        "bool"
      ]
    }
  ],
  "structs": [
    {
      "name": "Capabilities",
      "is_native": false,
      "is_event": false,
      "abilities": [
        "key"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "mint_cap",
          "type": "0x1::coin::MintCapability<0x114442acbfdd65c36fb88ab977e76eefbf7225465f677aa2b73f68bc9350f545::questflow::QFToken>"
        },
        {
          "name": "burn_cap",
          "type": "0x1::coin::BurnCapability<0x114442acbfdd65c36fb88ab977e76eefbf7225465f677aa2b73f68bc9350f545::questflow::QFToken>"
        },
        {
          "name": "owner",
          "type": "address"
        }
      ]
    },
    {
      "name": "QFToken",
      "is_native": false,
      "is_event": false,
      "abilities": [
        "key"
      ],
      "generic_type_params": [],
      "fields": [
        {
          "name": "dummy_field",
          "type": "bool"
        }
      ]
    }
  ]
} as const;