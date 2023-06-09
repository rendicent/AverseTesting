// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

contract AverseDaiStaking is IERC20 {
    string public name = "Averse Dai Staking";
    address public Owner;
    IERC20 public immutable avsToken;
    IERC20 public immutable daiToken;

    address[] public stakers;
    mapping(address => uint) public BalanceOfUser;
    mapping(address => uint) public _start;
    mapping(address => uint) public _goal;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(address _daiToken, address _avsToken) {
        daiToken = IERC20(_daiToken);
        avsToken = IERC20(_avsToken);
        Owner = msg.sender;
    }

    uint public TotalSupplyPool;

    function stakeTokens(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Transfer  Dai tokens to this contract for staking
        daiToken.transferFrom(msg.sender, address(this), _amount);

        _start[msg.sender] = block.timestamp;

        _goal[msg.sender] = _start[msg.sender] + 90 days;

        // Initialize Default Time

        // Update data of pool
        BalanceOfUser[msg.sender] += _amount;
        TotalSupplyPool += _amount;
        _updateRewards(msg.sender);

        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        // Add user to stakers array *only* if they haven't staked already
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking Tokens (Withdraw)
    function unstakeTokens() public {
        // Fetch staking balance
        uint balance = stakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");
        require(
            block.timestamp > _goal[msg.sender],
            "Must wait until Time period is up."
        );
        // ----|-------------------|-------
        //    start                goal
        // ---|------------|---------------|-------
        //  block    block + min     block + max

        // Reset staking balance
        
        stakingBalance[msg.sender] = 0;

        // Transfer Dai tokens to this withdraw address
        daiToken.transfer(msg.sender, balance);

        // Update Pool Data
        BalanceOfUser[msg.sender] -= balance;
        TotalSupplyPool -= balance;
        _updateRewards(msg.sender);

        // Update staking status
        isStaking[msg.sender] = false;
    }

    // Issuing Tokens
    function issueTokens() public {
        // Only owner can call this function
        require(msg.sender == Owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if (balance > 0) {
                avsToken.transfer(recipient, balance);
            }
        }
    }

    // Migrate Funds in case of contract vulnerability.

    function Migrate(address to, uint amount) public {
        // Only owner can call this function
        require(msg.sender == Owner, "caller must be the owner");
        daiToken.transfer(to, amount);
    }

    // Provide token to the contract that will be given out as reward.

    function ProvideAvs(uint Provided) external payable {
        require(msg.sender == Owner, "only owner can provide token for Reward");
        avsToken.transferFrom(msg.sender, address(this), Provided);
    }

    uint private constant MULTIPLIER = 1e18;
    uint private rewardIndex;
    mapping(address => uint) private rewardIndexOf;
    mapping(address => uint) private earned;

    function updateRewardIndex(uint reward) external {
        avsToken.transferFrom(msg.sender, address(this), reward);
        rewardIndex += (reward * MULTIPLIER) / TotalSupplyPool;
    }

    function _calculateRewards(address account) private view returns (uint) {
        uint shares = BalanceOfUser[account];
        return (shares * (rewardIndex - rewardIndexOf[account])) / MULTIPLIER;
    }

    function calculateRewardsEarned(
        address account
    ) external view returns (uint) {
        return earned[account] + _calculateRewards(account);
    }

    function _updateRewards(address account) private {
        earned[account] += _calculateRewards(account);
        rewardIndexOf[account] = rewardIndex;
    }

    function claim() external returns (uint) {
        _updateRewards(msg.sender);

        uint reward = earned[msg.sender];
        if (reward > 0) {
            earned[msg.sender] = 0;
            avsToken.transfer(msg.sender, reward);
        }

        return reward;
    }

    function totalSupply() external view override returns (uint) {}

    function balanceOf(address account) external view override returns (uint) {}

    function transfer(
        address recipient,
        uint amount
    ) external override returns (bool) {}

    function allowance(
        address owner,
        address spender
    ) external view override returns (uint) {}

    function approve(
        address spender,
        uint amount
    ) external override returns (bool) {}

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external override returns (bool) {}
}


   



