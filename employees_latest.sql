-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2017 at 11:01 AM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(7) NOT NULL,
  `app_id` varchar(50) DEFAULT NULL,
  `app_name` varchar(100) DEFAULT NULL,
  `app_description` varchar(1000) DEFAULT NULL,
  `business_sect` varchar(20) DEFAULT NULL,
  `business_subsect` varchar(100) DEFAULT NULL,
  `business_owner` varchar(50) DEFAULT NULL,
  `it_dept` varchar(100) DEFAULT NULL,
  `it_owner` varchar(50) DEFAULT NULL,
  `domain_lead` varchar(50) DEFAULT NULL,
  `ea_domain` varchar(20) DEFAULT NULL,
  `business_capability` varchar(500) DEFAULT NULL,
  `business_criticality` varchar(50) DEFAULT NULL,
  `avail_requirements` varchar(50) DEFAULT NULL,
  `country_usage` varchar(20) DEFAULT NULL,
  `year_implemented` int(4) DEFAULT NULL,
  `age_of_app` int(4) DEFAULT NULL,
  `message_format` varchar(50) DEFAULT NULL,
  `app_plan` varchar(100) DEFAULT NULL,
  `appsoft_type` varchar(50) DEFAULT NULL,
  `app_server` varchar(50) DEFAULT NULL,
  `integrattion_type` varchar(50) DEFAULT NULL,
  `appsoft_prodname` varchar(50) DEFAULT NULL,
  `prog_lang` varchar(50) DEFAULT NULL,
  `report_tool` varchar(50) DEFAULT NULL,
  `app_architecture` varchar(50) DEFAULT NULL,
  `ntier_app_arch` varchar(50) DEFAULT NULL,
  `hosting_location` varchar(50) DEFAULT NULL,
  `virtual_environ` varchar(20) DEFAULT NULL,
  `dr_available` varchar(20) DEFAULT NULL,
  `app_hardware` varchar(50) DEFAULT NULL,
  `app_os_family` varchar(50) DEFAULT NULL,
  `app_os` varchar(50) DEFAULT NULL,
  `db` varchar(50) DEFAULT NULL,
  `db_hardware` varchar(50) DEFAULT NULL,
  `dbos_sys_family` varchar(50) DEFAULT NULL,
  `db_os` varchar(50) DEFAULT NULL,
  `client_hardware` varchar(50) DEFAULT NULL,
  `client_os` varchar(50) DEFAULT NULL,
  `nw_accessiblity` varchar(50) DEFAULT NULL,
  `network` varchar(50) NOT NULL,
  `no_inter_otherapp` varchar(50) DEFAULT NULL,
  `depinteg_core` varchar(50) DEFAULT NULL,
  `totres_supapp` varchar(50) DEFAULT NULL,
  `no_of_users` varchar(50) DEFAULT NULL,
  `types_of_users` varchar(50) DEFAULT NULL,
  `no_of_licenses` varchar(50) DEFAULT NULL,
  `type_of_license` varchar(50) DEFAULT NULL,
  `monthly_trans` varchar(50) DEFAULT NULL,
  `sw_yearly_cost` int(20) DEFAULT NULL,
  `half_yearly_cost` int(20) DEFAULT NULL,
  `telco_yearly_cost` int(20) DEFAULT NULL,
  `vendor_supp_cost` int(20) DEFAULT NULL,
  `proj_benefits` int(20) DEFAULT NULL,
  `yearly_support_cost` varchar(50) DEFAULT NULL,
  `vend_supp_app` varchar(50) DEFAULT NULL,
  `isapp_still_vend` varchar(50) DEFAULT NULL,
  `vend_hav_locoff` char(20) DEFAULT NULL,
  `obs_tech_supp_sol` char(20) DEFAULT NULL,
  `obsolete_tech` varchar(50) DEFAULT NULL,
  `obs_tech_remarks` varchar(500) DEFAULT NULL,
  `curr_supp_insource` char(20) DEFAULT NULL,
  `curr_supp_osource` char(20) DEFAULT NULL,
  `curr_supp_joint` char(20) DEFAULT NULL,
  `curr_supp_remarks` varchar(500) DEFAULT NULL,
  `curr_enha_insource` char(20) DEFAULT NULL,
  `curr_enha_osource` char(20) DEFAULT NULL,
  `curr_enha_joint` char(20) DEFAULT NULL,
  `curr_enha_remarks` varchar(500) DEFAULT NULL,
  `source_avail_yes` char(20) DEFAULT NULL,
  `source_avail_no` char(20) DEFAULT NULL,
  `source_ifno_poss` char(20) DEFAULT NULL,
  `source_availremark` varchar(500) DEFAULT NULL,
  `rational_plan` varchar(50) DEFAULT NULL,
  `rational_remarks` varchar(1000) DEFAULT NULL,
  `rational_genremark` varchar(1000) DEFAULT NULL,
  `enduser_comp_app` varchar(500) DEFAULT NULL,
  `msa_worry_bucket` varchar(50) DEFAULT NULL,
  `sustain_assessrisk` varchar(50) DEFAULT NULL,
  `msa_app` varchar(50) DEFAULT NULL,
  `itb_techrisk_involve` varchar(50) DEFAULT NULL,
  `business_platform` varchar(50) DEFAULT NULL,
  `prob_apps` varchar(50) DEFAULT NULL,
  `blueprint_critical` varchar(50) DEFAULT NULL,
  `isApproved` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `app_id`, `app_name`, `app_description`, `business_sect`, `business_subsect`, `business_owner`, `it_dept`, `it_owner`, `domain_lead`, `ea_domain`, `business_capability`, `business_criticality`, `avail_requirements`, `country_usage`, `year_implemented`, `age_of_app`, `message_format`, `app_plan`, `appsoft_type`, `app_server`, `integrattion_type`, `appsoft_prodname`, `prog_lang`, `report_tool`, `app_architecture`, `ntier_app_arch`, `hosting_location`, `virtual_environ`, `dr_available`, `app_hardware`, `app_os_family`, `app_os`, `db`, `db_hardware`, `dbos_sys_family`, `db_os`, `client_hardware`, `client_os`, `nw_accessiblity`, `network`, `no_inter_otherapp`, `depinteg_core`, `totres_supapp`, `no_of_users`, `types_of_users`, `no_of_licenses`, `type_of_license`, `monthly_trans`, `sw_yearly_cost`, `half_yearly_cost`, `telco_yearly_cost`, `vendor_supp_cost`, `proj_benefits`, `yearly_support_cost`, `vend_supp_app`, `isapp_still_vend`, `vend_hav_locoff`, `obs_tech_supp_sol`, `obsolete_tech`, `obs_tech_remarks`, `curr_supp_insource`, `curr_supp_osource`, `curr_supp_joint`, `curr_supp_remarks`, `curr_enha_insource`, `curr_enha_osource`, `curr_enha_joint`, `curr_enha_remarks`, `source_avail_yes`, `source_avail_no`, `source_ifno_poss`, `source_availremark`, `rational_plan`, `rational_remarks`, `rational_genremark`, `enduser_comp_app`, `msa_worry_bucket`, `sustain_assessrisk`, `msa_app`, `itb_techrisk_involve`, `business_platform`, `prob_apps`, `blueprint_critical`, `isApproved`) VALUES
(91, 'check', 'vchecksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'vchecksix', 1999, 18, 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'vchecksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'vchecksix', 'checksix', 'checksix', 'checksix', 'checksix', 'undefined', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 19999, 19999, 19999, 9999, 9999, 'checksix', 'checksix', 'checksix', 'vchecksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'vchecksix', 'checksix', 'checksix', 'vchecksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'vchecksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'checksix', 'vchecksix', 'checksix', 'checksix', 'checksix', 'checksix', 1),
(92, 'checkseven', 'vcheckseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 1999, 18, 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 19999, 9999, 89999, 99999, 9999, 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'vcheckseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 'checkseven', 1),
(93, 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 1999, 18, 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 19999, 99999, 99999, 99999, 99999, '99999', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'vcheckeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'vcheckeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 'checkeight', 1),
(94, 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 1999, 18, 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 1999, 99999, 9999, 9999, 9999, 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'vchecknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'checknine', 'vchecknine', 1),
(95, 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 1999, 18, 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'vcheckadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadminv', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'vcheckadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'vcheckadmin', 999, 9999, 9999, 99999, 99999, '999checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 'checkadmin', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
