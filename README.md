**Micro-Meta App** was developed as part of a **global community initiative** including the **[4D Nucleome Imaging Working Group](https://www.4dnucleome.org/)**, **[BINA Quality Control and Data Management Working Group](https://www.bioimagingna.org/qc-dm-wg)** and **[QUAREP-LiMi](https://quarep.org/)**. 
 
> **News!** The works of this **global community effort** resulted in multiple publications featured on a recent **Nature Methods FOCUS ISSUE** dedicated to **[Reporting and reproducibility in microscopy](https://www.nature.com/collections/djiciihhjh)**. 

> **Learn More!** For a thorought description of Micro-Meta App consult our recent **[Nature Methods](https://doi.org/10.1038/s41592-021-01315-z)** and **[BioRxiv.org](https://doi.org/10.1101/2021.05.31.446382)** publications!

![Nature Methods FOCUS ISSUE](https://github.com/WU-BIMAC/MicroMetaApp.github.io/blob/master/images/CoverDraft_5-1_CROP_tight.png)

**Background** If you are a newby and you want to learn more about the importannce of metadata and quality control to ensure full reproducibility, quality and scientific value in light microscopy, please take a look at our recently posted overview manuscript entitled **"A perspective on Microscopy Metadata: data provenance and quality control"**, which is available on [ArXiv.org](https://arxiv.org/abs/1910.11370).


# 4DN Micro-Meta App React implementation

1. [Quick start guide](#quick-start-guide)
2. [Summary](#summary)
3. [Background](#background)
4. [Description](#description)
5. [Website](https://wu-bimac.github.io/MicroMetaApp.github.io/)
6. [Installation](https://micrometaapp-docs.readthedocs.io/en/latest/docs/intro/installation.html)
7. [Documentation](https://micrometaapp-docs.readthedocs.io/en/latest/index.html)
8. [Step-by-Step Instructions](https://micrometaapp-docs.readthedocs.io/en/latest/docs/tutorials/index.html#step-by-step-instructions)
9. [Tutorial Videos](https://micrometaapp-docs.readthedocs.io/en/latest/docs/tutorials/VideoTutorials.html#micro-meta-app-video-tutorials)
10. [Example data files](https://doi.org/10.5281/zenodo.4891883)

## Quick start guide
Use these videos to get started with using Micro-Meta App after downloading the example data files:
1. [Video 1](https://vimeo.com/562022222)
2. [Video 2](https://vimeo.com/562022281)

## Summary
**Micro-Meta App** is an interactive tool that was developed by Alex Rigano in the Strambio De Castillia's lab at the University of Massachusetts Chan Medical School to facilitate the documentation of light microscopy experiments on the basis of the scalable [4DN-BINA-OME](https://zenodo.org/record/4710731) Microscopy Metadata specifications that extend the [OME Data Model](https://www.openmicroscopy.org/Schemas/Documentation/Generated/OME-2016-06/ome.html).

**Micro-Meta App** is used to visually and intuitively document the microscopy conditions used to acquire specific datasets based on community-driven 4DN-BINA-OME Microscopy Metadata specifications. 

This repository contains a web app version of the tool implemented in Javascript [React](https://reactjs.org/).

Other available implementations of Micro-Meta App include:

- A [stand-alone version](https://github.com/WU-BIMAC/4DNMicroscopyMetadataToolReactElectron) implemented in Javascript [Electron](https://www.electronjs.org/) 
- A prototype [plugin version](https://github.com/WU-BIMAC/4DNMicroscopyMetadataToolOmero) to be integrated into the [OMERO](https://www.openmicroscopy.org/omero/scientists/).web browser

![Micro-Meta App: Create Microscope GUI](http://big.umassmed.edu/omegaweb/wp-content/uploads/2020/05/06_Build-a-Microscope_2.png)
Micro-Meta App is designed to aid in the collection of both Microscope Hardware Specifications and Image Acquisition Settings metadata. In this example, a previously saved Microscope file was selected from an available repository and opened for further editing. In order to add the metadata associated with a newly purchased objective to a Microscope file the “Magnification” drop-down menu is opened [1] and an additional “Objective” [2] is dragged onto the workspace.

## Background
Adequate recordkeeping is essential for most experiments as it is necessary in order to evaluate results, share data and allow experiments to be repeated. Keeping notes on microscopy experiments should be relatively unchallenging, as the microscope is a machine equipped with a limited number of known parts and settings. Nevertheless, to this date no widely adopted set of metadata guidelines to be recorded or published with imaging data exists. Metadata automatically recorded by microscopes from different companies vary widely and pose a substantial challenge for microscope users to create a good faith record of their work. Similarly, the complexity and aim of experiments using microscopes varies leading to different reporting requirements from the simple description of a sample to the need to document the complexities of sub-diffraction resolution imaging in living cells and beyond.
To address this challenge, the 4DN consortium has put forth a 4DN extension of the OME Core metadata model, which includes a tiered system of reporting guidelines that scales quality control and reporting requirements with experimental complexity and a comprehensive list of metadata key-value pairs that should be recorded for each tier, and a detailed explanation of why these values matter. Micro-Meta App was developed in order to lessen the recordkeeping burden, support the collection of microscopy provenance medatata and facilitate the wide adoption of these standards by  the the imaging community at large.

## Description
Micro-Meta App is a novel application that provides an interactive and intuitive approach for rigorous record-keeping in fluorescence microscopy and is based on the 4DN-OME Microscopy metadata standard and on the proposed tiered-system of guidelines.  The user’s data processing workflow consists of multiple steps. First, in the Create Microscope modality (Figure 1), the App allows the users to build a graphical representation of the microscope hardware by dragging-and-dropping individual components onto the workspace and entering the relevant attribute values based on the selected tier level. Second, Micro-Meta App generates tier-specific descriptions of the microscope hardware and exports them in a Microscope file that can be used as a template and shared with the community, with a significant reduction in the recordkeeping burden. Then, in the Use Microscope modality, Micro-Meta App opens an existing Microscope file, imports Image Acquisition settings from the header of image data files to be annotated and interactively guides the user through the collection of all missing instrument-specific and tier-appropriate image acquisition settings and calibration metrics required to ensure reuse and reproducibility of image data. Finally, the App generates JSON files that contain comprehensive descriptions of the conditions utilized to produce individual microscopy datasets, and that can be stored on the user’s file system, or on third party repositories. To lower the barrier of adoption of Micro-Meta App by a wide community of users the application is available as a stand-alone program, as a plugin of the OMERO web client and as a service of the 4DN data portal.


