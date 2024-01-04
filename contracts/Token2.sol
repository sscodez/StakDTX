pragma soldity ^0.8.0;
import '@openzepplin/contracts/token/ERC20/ERC20.sol'
contract Token2 is ERC20 {

    constructor()ERC20('Token2','TK2'){
        _mint(msg.sender,10000)
    }
}
