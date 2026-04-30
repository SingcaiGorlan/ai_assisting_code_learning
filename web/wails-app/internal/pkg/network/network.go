package network

import (
	"github.com/google/gopacket"
	"github.com/google/gopacket/layers"
)

// ParsePacket 解析网络数据包
func ParsePacket(data []byte) gopacket.Packet {
	return gopacket.NewPacket(data, layers.LayerTypeEthernet, gopacket.Default)
}

// ExtractIPInfo 提取IP信息
func ExtractIPInfo(packet gopacket.Packet) (*layers.IPv4, error) {
	if ipLayer := packet.Layer(layers.LayerTypeIPv4); ipLayer != nil {
		ip, ok := ipLayer.(*layers.IPv4)
		if ok {
			return ip, nil
		}
	}
	return nil, nil
}