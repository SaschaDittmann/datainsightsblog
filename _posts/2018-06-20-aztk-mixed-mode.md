---
layout: post
title:  "Configuring an Azure VNET to use AZTK in mixed mode"
date: 2018-06-20T13:31:32+02:00
image: /images/posts/AztkMixedMode00.png
tags: [big data, microsoft azure, apache spark, azure batch]
published: true
---

In my last post, I showed you how to provision a low-cost Apache Spark cluster on Microsoft Azure, with the help of the Azure Batch service, Low Priority Virtual Machines, and the Azure Distributed Data Engineering Toolkit (AZTK).

But have you tried to mix a cluster with Dedicated-, as well as Low Priority-Virtual Machines?

If you did, you propably run into an error...

<!--more-->

## Mixing Dedicated- and Low Priority, Virtual Machines

I tried to provision a Spark cluster with the following command:

{% highlight bash %}

aztk spark cluster create --id mycluster --size 1 --size-low-priority 2 --vm-size standard_d12_v2

{% endhighlight %}

But all I got, was the following error message:

{% include image_caption.html imageurl="https://datainsights.cloud/images/posts/AztkMixedMode01.png" title="You must configure a VNET to use AZTK in mixed mode (dedicated and low priority nodes)" caption="You must configure a VNET to use AZTK in mixed mode (dedicated and low priority nodes)" %}

## What do I need a mixed mode cluster for

But let my first start with the Why.

Azure offers low-priority virtual machines (VMs) to reduce the cost of your workloads. Low-priority VMs make new types of workloads possible by enabling a large amount of compute power to be used for a very low cost.

Low-priority VMs take advantage of surplus capacity in Azure. When you specify low-priority VMs in your cluster, Azure can use this surplus, when available.

The tradeoff for using low-priority VMs is that those VMs may not be available to be allocated or may be preempted at any time, depending on available capacity.

Dedicated VMs stay online all the time to process your Spark jobs, even if some of the low-priority VMs are offline.
That's the reason, why you might want to add dedicated VMs to your cluster too.

If you have a mixed-mode Spark cluster with both types of VMs, the master node will always to assigned to a dedicated VM.

{% include image_caption.html imageurl="https://datainsights.cloud/images/posts/AztkMixedMode02.png" title="AZTK Spark Cluster running in mixed mode" caption="AZTK Spark Cluster running in mixed mode" %}

## Creating an Azure Virtual Network

So the first thing I did was to create an Azure Virtual Network ([How to create a virtual network using the Azure portal](https://docs.microsoft.com/en-us/azure/virtual-network/quick-create-portal)) in the AZTK resource group.

After that, I opened the **Properties** section of the newly created VNET and copied the Resource ID to my clipboard.

{% include image_caption.html imageurl="https://datainsights.cloud/images/posts/AztkMixedMode03.png" title="Azure Virtual Network - Properties" caption="Azure Virtual Network - Properties" %}

## Update cluster.yaml file

I opened a Terminal window and used vim to edit the **cluster.yaml** file in the **.aztk** folder.

In that file, there is a section called "**To add your cluster to a virtual network provide the full arm resource id below**".

I removed the comment symbol from the line which contains the "**subnet_id:**" property and added the Resource ID from the Virtual Network.

I also added the name of the subnet with the **/subnets/** prefix.

{% highlight plain %}

subnet_id: /subscriptions/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/resourceGroups/aztk/providers/Microsoft.Network/virtualNetworks/aztk-vnet/subnets/default

{% endhighlight %}

{% include image_caption.html imageurl="https://datainsights.cloud/images/posts/AztkMixedMode04.png" title=".aztk/cluster.yaml Subnet Settings" caption=".aztk/cluster.yaml Subnet Settings" %}

## Create a cluster

After saving the chances to the cluster.yaml file, I was able to create a mixed-mode cluster with the toolkit.

{% include image_caption.html imageurl="https://datainsights.cloud/images/posts/AztkMixedMode05.png" title="AZTK - Creating a mixed-mode Spark cluster" caption="Creating a mixed-mode Spark cluster" %}
