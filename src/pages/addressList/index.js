import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import "./index.less";

@connect(({ addressList, user }) => ({
  ...addressList,
  ...user
}))
class Addresslist extends Component {
  config = {
    navigationBarTitleText: "收货地址"
  };

  componentDidMount = () => {
    this.props.dispatch({
      type: 'user/queryUser',
    })
  };

  componentDidShow = () => {
    // this.props.dispatch({
    //   type: 'addressList/getAddressList',
    // })
  };

  addressUpdate = () => {
    // this.props.dispatch({
    //   type: "addressUpdate/save",
    //   payload: {
    //     addressId: "",
    //     showValue: {
    //       region_code: "",
    //       region_name: ""
    //     },
    //     consignee_name: "",
    //     consignee_phone: "",
    //     consignee_address: ""
    //   }
    // });
    Taro.navigateTo({
      url: "/pages/addressUpdate/index"
    });
  };

  addressEdit = e => {
    const {
      id,
      region_code,
      region_name,
      consignee_name,
      consignee_phone,
      consignee_address
    } = e.currentTarget.dataset;
    this.props.dispatch({
      type: "addressUpdate/save",
      payload: {
        addressId: id,
        showValue: {
          region_code,
          region_name
        },
        consignee_name,
        consignee_phone,
        consignee_address
      }
    });
    Taro.navigateTo({
      url: "/pages/addressUpdate/index"
    });
  };

  render() {
    const { addressList } = this.props;
    return (
      <View className="addressList-page">
        {addressList.length > 0 ? (
          addressList.map(item => (
            <View className="content" key={item.id}>
              <View className="info">
                <View className="contact">
                  <Text className="name">{item.consignee_name}</Text>
                  <Text className="mobile">{item.consignee_phone}</Text>
                </View>
                <View className="region">
                  <View className="name">{item.region_name}</View>
                  <View className="detail">{item.consignee_address}</View>
                </View>
              </View>
              <View
                className="edit"
                data-id={item.id}
                data-region_code={item.region_code}
                data-region_name={item.region_name}
                data-consignee_name={item.consignee_name}
                data-consignee_phone={item.consignee_phone}
                data-consignee_address={item.consignee_address}
                onClick={this.addressEdit}
              >
                <Image
                  mode="widthFix"
                  src="http://static-r.msparis.com/uploads/9/1/91d94589817e388f6c2d641f34d99b2f.png"
                />
              </View>
            </View>
          ))
        ) : (
            <View className="empty-address">
              <Image
                mode="widthFix"
                src="https://static-rs.msparis.com/m-site/images/empty/address.png"
              />
            </View>
          )}
        {
          addressList.length === 0 && <View className="add" onClick={this.addressUpdate}>
            <Image mode="widthFix" src={require("../../images/icon/add.png")} />
            <Text>添加地址</Text>
          </View>
        }

      </View>
    );
  }
}

export default Addresslist;
