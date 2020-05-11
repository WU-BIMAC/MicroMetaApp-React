# 4DN Micro-Meta App React implementation

## Summary
The 4DN Micro-Meta App is an interactive tool that was developed by Alex Rigano in the Strambio De Castillia's lab at UMMS to facilitate the documentation of fluorescence microscopy experiments. 
It is designed around an interactive graphical interface that intuitively guides bench scientists through the often laborious process of collecting and reporting the minimal microscopy and image acquisition metadata defined by the 4DN microscopy metadata tiered system of guidelines. 

This repository contains a web app version of the tool implemented in Javascript [React](https://reactjs.org/)

![Micro-Meta App: Create Microscope GUI](http://big.umassmed.edu/omegaweb/wp-content/uploads/2020/05/06_Build-a-Microscope_2.png)
The Micro-Meta App is designed to aid in the collection of both Microscope Hardware Specifications and Image Acquisition Settings metadata. In this example, a previously saved Microscope file was selected from an available repository and opened for further editing. In order to add a newly purchased objective to the Microscope file the “Magnification” drop-down menu is opened [1] and an additional “Objective” [2] is dragged onto the workspace.

## Background
Adequate recordkeeping is essential for most experiments as it is necessary in order to evaluate results, share data and allow experiments to be repeated. Keeping notes on microscopy experiments should be relatively unchallenging in this regard, as the microscope is a machine equipped with a limited number of known parts and settings. Nevertheless, to this date no widely adopted set of metadata descriptors to be recorded or published with imaging data exists. Metadata automatically recorded by microscopes from different companies vary widely and pose a substantial challenge for microscope users to create a good faith record of their work. Similarly, the complexity and aim of experiments using microscopes varies leading to different reporting requirements from the simple description of a sample to the need to document the complexities of sub-diffraction resolution imaging in living cells and beyond.
To solve this problem the 4DN Imaging Standards Working Group put forth a tiered system of guidelines for describing and documenting microscopy experiments, which includes a comprehensive list of metadata key-value pairs that should be recorded for each tier, and a detailed explanation of why these values matter.
The 4DN Micro-Meta App was developed in order to lessen the recordkeeping burden and facilitate the wide adoption of these standards by  the the imaging community at large.


