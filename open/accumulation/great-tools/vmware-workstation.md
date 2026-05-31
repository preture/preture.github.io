# VMware Workstation安装和使用

## 简介

VMware Workstation 是一款专业的桌面虚拟化软件，允许用户在单台物理机上同时运行多个虚拟机（如 Windows、Linux等），广泛应用于开发测试、环境隔离、系统学习等场景。

## 安装

### Windows

```bash
# 1. 官网下载安装包
open https://www.vmware.com/products/workstation-pro.html

# 2. 双击运行安装程序，按向导完成安装

# 3. 注册 Broadcom 账号即可免费使用
```

### Linux

```bash
# 1. 下载 Linux 版 Bundle 安装包
wget https://www.vmware.com/go/getworkstation-linux

# 2. 添加执行权限并安装
chmod +x VMware-Workstation-*.bundle
sudo ./VMware-Workstation-*.bundle

# 3. 启动
vmware
```

## 核心特性

- **虚拟机快照**：保存虚拟机某一时刻的状态，随时回滚
- **克隆**：快速复制现有虚拟机环境
- **网络模式**：支持桥接、NAT、仅主机等多种网络配置
- **共享文件夹**：宿主机与虚拟机之间便捷文件共享
- **Unity 模式**：在宿主机桌面直接运行虚拟机内的应用程序
- **虚拟机加密**：对虚拟机进行密码保护
- **vSphere 集成**：可连接 ESXi 或 vCenter 管理远程虚拟机

## 使用场景

### 1. 开发测试环境隔离

在一台机器上运行多个不同操作系统版本的虚拟机，避免污染宿主机环境。例如在 Windows 上开一个 Linux 虚拟机做后端开发，再开一个 Windows 10 虚拟机做 IE 兼容性测试。

### 2. 系统学习与实验

学习 Linux 系统管理、网络配置、数据库部署等操作时，可随时创建快照，出错后秒级回滚，无需担心损坏物理机。

### 3. 跨平台软件测试

测试软件在不同操作系统（Windows 7/10/11、Debian、Ubuntu、CentOS 等）上的兼容性行为，无需准备多台物理机。

### 4. 安全分析与隔离

在隔离的虚拟机中运行可疑程序或分析恶意软件样本，避免威胁扩散到宿主机。

### 5. 演示与教学

通过快照预设多个演示环境状态，在课堂或会议中快速切换不同场景。

## 常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + Alt + Enter` | 全屏/退出全屏 |
| `Ctrl + Alt` | 释放鼠标光标回到宿主机 |
| `Ctrl + Z` | 撤销操作（虚拟机配置界面） |
| `Ctrl + Shift + N` | 创建新虚拟机 |
| `Ctrl + Shift + T` | 打开虚拟机设置 |
| `Ctrl + Shift + S` | 拍摄快照 |

## 注意事项

- VMware Workstation Pro 已对个人用户免费，注册 Broadcom 账号即可下载使用
- 虚拟机磁盘文件（.vmdk）体积较大，建议存放在固态硬盘并预留充足空间
- 运行多个虚拟机时注意宿主机内存和 CPU 资源分配，避免过载
- 建议为每个虚拟机安装 VMware Tools 以启用增强功能和更好的性能

## 链接

- [官网](https://www.vmware.com/products/workstation-pro.html)
- [VMware Tools 下载](https://kb.vmware.com/s/article/1014294)
