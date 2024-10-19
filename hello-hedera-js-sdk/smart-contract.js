const {
    Client,
    ContractFunctionParameters,
    ContractCallQuery,
    ContractExecuteTransaction,
    Hbar,
    ContractCreateFlow,
    AccountId,
    PrivateKey,
    AccountCreateTransaction
    } = require("@hashgraph/sdk");

    require("dotenv").config();

    // Grab your Hedera testnet account details from .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null ||myPrivateKey == null) {
        throw new Error(
            "environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present"
        );
    }

    // Create your Hedera testnet client
    const client = Client.forTestnet();

    // Set your account as client's operator
    client.setOperator(myAccountId, myPrivateKey);

    //set default maximum transaction fee (in Hbar)
    client.setMaxTransactionFee(new Hbar(100));

    //set the maximum query payment (in Hbar)
    client.setMaxQueryPayment(new Hbar(50));


    // Account creation function
    async function accountCreator(pvKey, iBal) {
        const response = await new AccountCreateTransaction()
        .setInitialBalance(new Hbar(iBal))
        .setKey(pvKey.publicKey)
        .setMaxAutomaticTokenAssociations(10)
        .execute(client);
        const receipt = await response.getReceipt(client);
        return receipt.accountId;
    }

    async function environmentSetup() {

    // Init Alice account
    const aliceKey = PrivateKey.generateED25519();
    const aliceId = await accountCreator(aliceKey, 100);
    
    const bytecode = "60806040523480156200001157600080fd5b5060018060008060068111156200002d576200002c620001f1565b5b6006811115620000425762000041620001f1565b5b81526020019081526020016000208190555060026001600060016006811115620000715762000070620001f1565b5b6006811115620000865762000085620001f1565b5b81526020019081526020016000208190555060046001600060026006811115620000b557620000b4620001f1565b5b6006811115620000ca57620000c9620001f1565b5b81526020019081526020016000208190555060086001600060036006811115620000f957620000f8620001f1565b5b60068111156200010e576200010d620001f1565b5b815260200190815260200160002081905550601060016000600460068111156200013d576200013c620001f1565b5b6006811115620001525762000151620001f1565b5b81526020019081526020016000208190555060206001600060056006811115620001815762000180620001f1565b5b6006811115620001965762000195620001f1565b5b815260200190815260200160002081905550604060016000600680811115620001c457620001c3620001f1565b5b6006811115620001d957620001d8620001f1565b5b81526020019081526020016000208190555062000220565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6123fc80620002306000396000f3fe60806040526004361061007b5760003560e01c806382b562aa1161004e57806382b562aa146101605780639b23d3d91461019d578063b6c907a6146101da578063eac6f3fe1461020a5761007b565b80630a284cb61461008057806311e1fc07146100bd57806315dacbea146100fa578063618dc65e14610137575b600080fd5b34801561008c57600080fd5b506100a760048036038101906100a291906114f9565b610247565b6040516100b49190611571565b60405180910390f35b3480156100c957600080fd5b506100e460048036038101906100df91906115c2565b6102c9565b6040516100f19190611571565b60405180910390f35b34801561010657600080fd5b50610121600480360381019061011c91906115c2565b6103e5565b60405161012e9190611571565b60405180910390f35b34801561014357600080fd5b5061015e60048036038101906101599190611629565b610503565b005b34801561016c57600080fd5b50610187600480360381019061018291906116b1565b61062a565b604051610194919061171d565b60405180910390f35b3480156101a957600080fd5b506101c460048036038101906101bf91906115c2565b610698565b6040516101d19190611571565b60405180910390f35b6101f460048036038101906101ef91906117d9565b6107b6565b60405161020191906118b7565b60405180910390f35b34801561021657600080fd5b50610231600480360381019061022c91906115c2565b61094d565b60405161023e9190611571565b60405180910390f35b600080600061025885600086610a69565b9250509150601660030b82146102a3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161029a90611955565b60405180910390fd5b806000815181106102b7576102b6611975565b5b60200260200101519250505092915050565b600080600061016773ffffffffffffffffffffffffffffffffffffffff16639b23d3d960e01b8888888860405160240161030694939291906119b3565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516103709190611a69565b600060405180830381855af49150503d80600081146103ab576040519150601f19603f3d011682016040523d82523d6000602084013e6103b0565b606091505b5091509150816103c15760156103d6565b808060200190518101906103d59190611ab9565b5b60030b92505050949350505050565b600080600061016773ffffffffffffffffffffffffffffffffffffffff166315dacbea60e01b8888888860405160240161042294939291906119b3565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161048c9190611a69565b6000604051808303816000865af19150503d80600081146104c9576040519150601f19603f3d011682016040523d82523d6000602084013e6104ce565b606091505b5091509150816104df5760156104f4565b808060200190518101906104f39190611ab9565b5b60030b92505050949350505050565b60008061016773ffffffffffffffffffffffffffffffffffffffff1663618dc65e60e01b858560405160240161053a929190611b30565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516105a49190611a69565b6000604051808303816000865af19150503d80600081146105e1576040519150601f19603f3d011682016040523d82523d6000602084013e6105e6565b606091505b50915091507f4af4780e06fe8cb9df64b0794fa6f01399af979175bb988e35e0e57e594567bc828260405161061c929190611b7b565b60405180910390a150505050565b60006106368385610be1565b50600061064585308686610cf9565b9050601660030b811461068d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068490611c1d565b60405180910390fd5b809150509392505050565b600080600061016773ffffffffffffffffffffffffffffffffffffffff16639b23d3d960e01b888888886040516024016106d594939291906119b3565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505060405161073f9190611a69565b6000604051808303816000865af19150503d806000811461077c576040519150601f19603f3d011682016040523d82523d6000602084013e610781565b606091505b5091509150816107925760156107a7565b808060200190518101906107a69190611ab9565b5b60030b92505050949350505050565b600080600167ffffffffffffffff8111156107d4576107d36112e3565b5b60405190808252806020026020018201604052801561080d57816020015b6107fa611132565b8152602001906001900390816107f25790505b50905061081d6004600130610e17565b8160008151811061083157610830611975565b5b6020026020010181905250610844611152565b87816000018190525086816020018190525085816060018190525030816040019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250506001816080019015159081151581525050848160a0019060070b908160070b81525050818160e0018190525060008160c00190151590811515815250506108de3085610e4e565b8161010001819052506000806108f383610ea6565b91509150601660030b821461093d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093490611caf565b60405180910390fd5b8094505050505095945050505050565b600080600061016773ffffffffffffffffffffffffffffffffffffffff166315dacbea60e01b8888888860405160240161098a94939291906119b3565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516109f49190611a69565b600060405180830381855af49150503d8060008114610a2f576040519150601f19603f3d011682016040523d82523d6000602084013e610a34565b606091505b509150915081610a45576015610a5a565b80806020019051810190610a599190611ab9565b5b60030b92505050949350505050565b600080606060008061016773ffffffffffffffffffffffffffffffffffffffff1663e0f4059a60e01b898989604051602401610aa793929190611ddb565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610b119190611a69565b6000604051808303816000865af19150503d8060008114610b4e576040519150601f19603f3d011682016040523d82523d6000602084013e610b53565b606091505b509150915081610baf57601560008067ffffffffffffffff811115610b7b57610b7a6112e3565b5b604051908082528060200260200182016040528015610ba95781602001602082028036833780820191505090505b50610bc4565b80806020019051810190610bc39190611ef1565b5b8260030b9250809550819650829750505050505093509350939050565b600080600061016773ffffffffffffffffffffffffffffffffffffffff166349146bde60e01b8686604051602401610c1a929190611f60565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610c849190611a69565b6000604051808303816000865af19150503d8060008114610cc1576040519150601f19603f3d011682016040523d82523d6000602084013e610cc6565b606091505b509150915081610cd7576015610cec565b80806020019051810190610ceb9190611ab9565b5b60030b9250505092915050565b600080600061016773ffffffffffffffffffffffffffffffffffffffff16635cfc901160e01b88888888604051602401610d369493929190611f89565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610da09190611a69565b6000604051808303816000865af19150503d8060008114610ddd576040519150601f19603f3d011682016040523d82523d6000602084013e610de2565b606091505b509150915081610df3576015610e08565b80806020019051810190610e079190611ab9565b5b60030b92505050949350505050565b610e1f611132565b6040518060400160405280610e3386611015565b8152602001610e428585611056565b81525090509392505050565b610e566111c1565b82816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505081816040019060070b908160070b8152505092915050565b6000808260008161010001516000015160070b148015610ed2575060008161010001516040015160070b145b15610ef5576276a70060030b8161010001516040019060070b908160070b815250505b60008061016773ffffffffffffffffffffffffffffffffffffffff163463ea83f29360e01b88604051602401610f2b91906122f7565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610f959190611a69565b60006040518083038185875af1925050503d8060008114610fd2576040519150601f19603f3d011682016040523d82523d6000602084013e610fd7565b606091505b509150915081610fea5760156000610fff565b80806020019051810190610ffe9190612357565b5b8160030b91508095508196505050505050915091565b60006001600083600681111561102e5761102d612397565b5b60068111156110405761103f612397565b5b8152602001908152602001600020549050919050565b61105e6111fe565b6001600481111561107257611071612397565b5b83600481111561108557611084612397565b5b036110c75781816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505061112c565b6004808111156110da576110d9612397565b5b8360048111156110ed576110ec612397565b5b0361112b5781816080019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250505b5b92915050565b60405180604001604052806000815260200161114c6111fe565b81525090565b6040518061012001604052806060815260200160608152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160608152602001600015158152602001600060070b8152602001600015158152602001606081526020016111bb6111c1565b81525090565b6040518060600160405280600060070b8152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600060070b81525090565b6040518060a00160405280600015158152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016060815260200160608152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061129a8261126f565b9050919050565b6112aa8161128f565b81146112b557600080fd5b50565b6000813590506112c7816112a1565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61131b826112d2565b810181811067ffffffffffffffff8211171561133a576113396112e3565b5b80604052505050565b600061134d61125b565b90506113598282611312565b919050565b600067ffffffffffffffff821115611379576113786112e3565b5b602082029050602081019050919050565b600080fd5b600080fd5b600067ffffffffffffffff8211156113af576113ae6112e3565b5b6113b8826112d2565b9050602081019050919050565b82818337600083830152505050565b60006113e76113e284611394565b611343565b9050828152602081018484840111156114035761140261138f565b5b61140e8482856113c5565b509392505050565b600082601f83011261142b5761142a6112cd565b5b813561143b8482602086016113d4565b91505092915050565b60006114576114528461135e565b611343565b9050808382526020820190506020840283018581111561147a5761147961138a565b5b835b818110156114c157803567ffffffffffffffff81111561149f5761149e6112cd565b5b8086016114ac8982611416565b8552602085019450505060208101905061147c565b5050509392505050565b600082601f8301126114e0576114df6112cd565b5b81356114f0848260208601611444565b91505092915050565b600080604083850312156115105761150f611265565b5b600061151e858286016112b8565b925050602083013567ffffffffffffffff81111561153f5761153e61126a565b5b61154b858286016114cb565b9150509250929050565b60008160070b9050919050565b61156b81611555565b82525050565b60006020820190506115866000830184611562565b92915050565b6000819050919050565b61159f8161158c565b81146115aa57600080fd5b50565b6000813590506115bc81611596565b92915050565b600080600080608085870312156115dc576115db611265565b5b60006115ea878288016112b8565b94505060206115fb878288016112b8565b935050604061160c878288016112b8565b925050606061161d878288016115ad565b91505092959194509250565b600080604083850312156116405761163f611265565b5b600061164e858286016112b8565b925050602083013567ffffffffffffffff81111561166f5761166e61126a565b5b61167b85828601611416565b9150509250929050565b61168e81611555565b811461169957600080fd5b50565b6000813590506116ab81611685565b92915050565b6000806000606084860312156116ca576116c9611265565b5b60006116d8868287016112b8565b93505060206116e9868287016112b8565b92505060406116fa8682870161169c565b9150509250925092565b6000819050919050565b61171781611704565b82525050565b6000602082019050611732600083018461170e565b92915050565b600067ffffffffffffffff821115611753576117526112e3565b5b61175c826112d2565b9050602081019050919050565b600061177c61177784611738565b611343565b9050828152602081018484840111156117985761179761138f565b5b6117a38482856113c5565b509392505050565b600082601f8301126117c0576117bf6112cd565b5b81356117d0848260208601611769565b91505092915050565b600080600080600060a086880312156117f5576117f4611265565b5b600086013567ffffffffffffffff8111156118135761181261126a565b5b61181f888289016117ab565b955050602086013567ffffffffffffffff8111156118405761183f61126a565b5b61184c888289016117ab565b945050604086013567ffffffffffffffff81111561186d5761186c61126a565b5b611879888289016117ab565b935050606061188a8882890161169c565b925050608061189b8882890161169c565b9150509295509295909350565b6118b18161128f565b82525050565b60006020820190506118cc60008301846118a8565b92915050565b600082825260208201905092915050565b7f4661696c656420746f206d696e74206e6f6e2d66756e6769626c6520746f6b6560008201527f6e00000000000000000000000000000000000000000000000000000000000000602082015250565b600061193f6021836118d2565b915061194a826118e3565b604082019050919050565b6000602082019050818103600083015261196e81611932565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6119ad8161158c565b82525050565b60006080820190506119c860008301876118a8565b6119d560208301866118a8565b6119e260408301856118a8565b6119ef60608301846119a4565b95945050505050565b600081519050919050565b600081905092915050565b60005b83811015611a2c578082015181840152602081019050611a11565b60008484015250505050565b6000611a43826119f8565b611a4d8185611a03565b9350611a5d818560208601611a0e565b80840191505092915050565b6000611a758284611a38565b915081905092915050565b60008160030b9050919050565b611a9681611a80565b8114611aa157600080fd5b50565b600081519050611ab381611a8d565b92915050565b600060208284031215611acf57611ace611265565b5b6000611add84828501611aa4565b91505092915050565b600082825260208201905092915050565b6000611b02826119f8565b611b0c8185611ae6565b9350611b1c818560208601611a0e565b611b25816112d2565b840191505092915050565b6000604082019050611b4560008301856118a8565b8181036020830152611b578184611af7565b90509392505050565b60008115159050919050565b611b7581611b60565b82525050565b6000604082019050611b906000830185611b6c565b8181036020830152611ba28184611af7565b90509392505050565b7f4661696c656420746f207472616e73666572206e6f6e2d66756e6769626c652060008201527f746f6b656e000000000000000000000000000000000000000000000000000000602082015250565b6000611c076025836118d2565b9150611c1282611bab565b604082019050919050565b60006020820190508181036000830152611c3681611bfa565b9050919050565b7f4661696c656420746f20637265617465206e6f6e2d66756e6769626c6520746f60008201527f6b656e0000000000000000000000000000000000000000000000000000000000602082015250565b6000611c996023836118d2565b9150611ca482611c3d565b604082019050919050565b60006020820190508181036000830152611cc881611c8c565b9050919050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600082825260208201905092915050565b6000611d17826119f8565b611d218185611cfb565b9350611d31818560208601611a0e565b611d3a816112d2565b840191505092915050565b6000611d518383611d0c565b905092915050565b6000602082019050919050565b6000611d7182611ccf565b611d7b8185611cda565b935083602082028501611d8d85611ceb565b8060005b85811015611dc95784840389528151611daa8582611d45565b9450611db583611d59565b925060208a01995050600181019050611d91565b50829750879550505050505092915050565b6000606082019050611df060008301866118a8565b611dfd6020830185611562565b8181036040830152611e0f8184611d66565b9050949350505050565b600081519050611e2881611685565b92915050565b600067ffffffffffffffff821115611e4957611e486112e3565b5b602082029050602081019050919050565b6000611e6d611e6884611e2e565b611343565b90508083825260208201905060208402830185811115611e9057611e8f61138a565b5b835b81811015611eb95780611ea58882611e19565b845260208401935050602081019050611e92565b5050509392505050565b600082601f830112611ed857611ed76112cd565b5b8151611ee8848260208601611e5a565b91505092915050565b600080600060608486031215611f0a57611f09611265565b5b6000611f1886828701611aa4565b9350506020611f2986828701611e19565b925050604084015167ffffffffffffffff811115611f4a57611f4961126a565b5b611f5686828701611ec3565b9150509250925092565b6000604082019050611f7560008301856118a8565b611f8260208301846118a8565b9392505050565b6000608082019050611f9e60008301876118a8565b611fab60208301866118a8565b611fb860408301856118a8565b611fc56060830184611562565b95945050505050565b600081519050919050565b600082825260208201905092915050565b6000611ff582611fce565b611fff8185611fd9565b935061200f818560208601611a0e565b612018816112d2565b840191505092915050565b61202c8161128f565b82525050565b61203b81611b60565b82525050565b61204a81611555565b82525050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6120858161158c565b82525050565b600060a0830160008301516120a36000860182612032565b5060208301516120b66020860182612023565b50604083015184820360408601526120ce8282611d0c565b915050606083015184820360608601526120e88282611d0c565b91505060808301516120fd6080860182612023565b508091505092915050565b6000604083016000830151612120600086018261207c565b5060208301518482036020860152612138828261208b565b9150508091505092915050565b60006121518383612108565b905092915050565b6000602082019050919050565b600061217182612050565b61217b818561205b565b93508360208202850161218d8561206c565b8060005b858110156121c957848403895281516121aa8582612145565b94506121b583612159565b925060208a01995050600181019050612191565b50829750879550505050505092915050565b6060820160008201516121f16000850182612041565b5060208201516122046020850182612023565b5060408201516122176040850182612041565b50505050565b600061016083016000830151848203600086015261223b8282611fea565b915050602083015184820360208601526122558282611fea565b915050604083015161226a6040860182612023565b50606083015184820360608601526122828282611fea565b91505060808301516122976080860182612032565b5060a08301516122aa60a0860182612041565b5060c08301516122bd60c0860182612032565b5060e083015184820360e08601526122d58282612166565b9150506101008301516122ec6101008601826121db565b508091505092915050565b60006020820190508181036000830152612311818461221d565b905092915050565b60006123248261126f565b9050919050565b61233481612319565b811461233f57600080fd5b50565b6000815190506123518161232b565b92915050565b6000806040838503121561236e5761236d611265565b5b600061237c85828601611aa4565b925050602061238d85828601612342565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fdfea264697066735822122063f39734e0d74df5079e24ac5283123560eb80cfa99b53b160e57d06642aa73664736f6c63430008120033"

    // Create contract
    const createContract = new ContractCreateFlow()
    .setGas(4000000) // Increase if revert
    .setBytecode(bytecode); // Contract bytecode
    const createContractTx = await createContract.execute(client);
    const createContractRx = await createContractTx.getReceipt(client);
    const contractId = createContractRx.contractId;

    console.log(`Contract created with ID: ${contractId} \n`);

    // Create NFT from precompile
    const createToken = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(4000000) // Increase if revert
        .setPayableAmount(50) // Increase if revert
        .setFunction("createNft",
            new ContractFunctionParameters()
            .addString("Fall Collection") // NFT name
            .addString("LEAF") // NFT symbol
            .addString("Just a memo") // NFT memo
            .addInt64(250) // NFT max supply
            .addInt64(7000000) // Expiration: Needs to be between 6999999 and 8000001
            );

    const createTokenTx = await createToken.execute(client);
    const createTokenRx = await createTokenTx.getRecord(client);
    const tokenIdSolidityAddr = createTokenRx.contractFunctionResult.getAddress(0);
    const tokenId = AccountId.fromSolidityAddress(tokenIdSolidityAddr);

    console.log(`Token created with ID: ${tokenId} \n`);

    // IPFS URI
    metadata = "ipfs://bafyreie3ichmqul4xa7e6xcy34tylbuq2vf3gnjf7c55trg3b6xyjr4bku/metadata.json";
    
    // Mint NFT
    const mintToken = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(4000000)
        .setMaxTransactionFee(new Hbar(20)) //Use when HBAR is under 10 cents
        .setFunction("mintNft",
            new ContractFunctionParameters()
            .addAddress(tokenIdSolidityAddr) // Token address
            .addBytesArray([Buffer.from(metadata)]) // Metadata
            );
            
    const mintTokenTx = await mintToken.execute(client);
    const mintTokenRx = await mintTokenTx.getRecord(client);
    const serial = mintTokenRx.contractFunctionResult.getInt64(0);

    console.log(`Minted NFT with serial: ${serial} \n`);


    // Transfer NFT to Alice
    const transferToken = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(4000000)
        .setFunction("transferNft",
            new ContractFunctionParameters()
            .addAddress(tokenIdSolidityAddr) // Token address
            .addAddress(aliceId.toSolidityAddress()) // Token receiver (Alice)
            .addInt64(serial)) // NFT serial number
        .freezeWith(client) // freezing using client
        .sign(aliceKey); // Sign transaction with Alice

    const transferTokenTx = await transferToken.execute(client);
    const transferTokenRx = await transferTokenTx.getReceipt(client);

    console.log(`Transfer status: ${transferTokenRx.status} \n`);

}
environmentSetup();
